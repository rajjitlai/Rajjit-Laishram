"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Crosshair, X, CheckCircle2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Battery, AlertTriangle, Map as MapIcon, Volume2, VolumeX, Eye, Camera } from "lucide-react";
import { triggerSystemSignal } from "./SystemToaster";

// --- Sub-Components ---
const DroneVisual = ({ color = "#38b6ff", isWarning = false, rotation = 0 }: { color?: string, isWarning?: boolean, rotation?: number }) => {
    const [imgError, setImgError] = useState(false);
    return !imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src="/drone.gif"
            alt="UAV"
            className={`w-10 h-10 md:w-16 md:h-16 object-contain transition-all duration-100 ${isWarning ? "brightness-150 scale-110 drop-shadow-[0_0_15px_#ff0000]" : ""}`}
            onError={() => setImgError(true)}
            style={{
                transform: `rotate(${rotation}deg)`,
                filter: isWarning ? "none" : (color === "#38ff42" ? "none" : color === "#38b6ff" ? "hue-rotate(180deg) brightness(1.2)" : "hue-rotate(280deg) brightness(1.2)")
            }}
        />
    ) : (
        <Plane size={32} style={{ color: isWarning ? "#ff3333" : color, transform: `rotate(${rotation + 45}deg)` }} className="md:w-10 md:h-10 transition-all duration-100" />
    );
};

const MobilePad = ({ onMovePress, onMoveRelease, color, label }: { onMovePress: (dir: string) => void, onMoveRelease: (dir: string) => void, color: string, label: string }) => {
    return (
        <div className="flex flex-col items-center gap-1 opacity-80 md:hidden">
            <span className="text-[7px] font-mono mb-1 font-black" style={{ color }}>{label}</span>
            <div className="grid grid-cols-3 gap-1">
                <div />
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMovePress('up'); }} onPointerUp={() => onMoveRelease('up')} onPointerLeave={() => onMoveRelease('up')} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronUp size={20} /></button>
                <div />
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMovePress('left'); }} onPointerUp={() => onMoveRelease('left')} onPointerLeave={() => onMoveRelease('left')} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronLeft size={20} /></button>
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMovePress('down'); }} onPointerUp={() => onMoveRelease('down')} onPointerLeave={() => onMoveRelease('down')} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronDown size={20} /></button>
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMovePress('right'); }} onPointerUp={() => onMoveRelease('right')} onPointerLeave={() => onMoveRelease('right')} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

// --- Main Simulation ---
interface TracePoint { x: number; y: number; id: number; timestamp: number; }
interface Waypoint { id: number; x: number; y: number; status: "pending" | "completed"; }
type ViewMode = "normal" | "night" | "thermal";

const OBSTACLES = [
    { x: 20, y: 30, w: 10, h: 15, name: "SECTOR_1_BLOCK" },
    { x: 60, y: 50, w: 25, h: 10, name: "RF_INTERFERENCE_ZONE" },
    { x: 40, y: 70, w: 10, h: 20, name: "STRUCTURE_ALPHA" }
];

export const UAVSimulation = React.memo(function UAVSimulation({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const audioCtx = useRef<AudioContext | null>(null);
    const oscillators = useRef<Record<string, { osc: OscillatorNode, gain: GainNode }>>({});

    // Optimization: Refs for direct DOM manipulation
    const aceDroneRef = useRef<HTMLDivElement>(null);
    const infDroneRef = useRef<HTMLDivElement>(null);
    const acePolylineRef = useRef<SVGPolylineElement>(null);
    const infPolylineRef = useRef<SVGPolylineElement>(null);
    const aceTraceRef = useRef<TracePoint[]>([]);
    const infTraceRef = useRef<TracePoint[]>([]);

    // Physics State
    const aceRef = useRef({ x: 5, y: 5, vx: 0, vy: 0, rot: 0, battery: 100 });
    const infRef = useRef({ x: 95, y: 95, vx: 0, vy: 0, rot: 0, battery: 100 });
    const keys = useRef<Record<string, boolean>>({});
    const aceTraceId = useRef(0);
    const infTraceId = useRef(0);

    // Core Simulation State
    const [missionMode, setMissionMode] = useState<"manual" | "survey" | "sweep" | "dogfight">("manual");
    const [viewMode, setViewMode] = useState<ViewMode>("normal");
    const [showFPV, setShowFPV] = useState(false);
    const [collisionWarning, setCollisionWarning] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isCrashed, setIsCrashed] = useState(false);
    const crashedStateRef = useRef(false);
    const dogfightTimerRef = useRef(0);

    // For rendering HUD data (updated less frequently than 60fps)
    const [aceStats, setAceStats] = useState({ battery: 100 });
    const [infStats, setInfStats] = useState({ battery: 100 });
    const [completedCount, setCompletedCount] = useState(0);

    // Mission State
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const nextWaypointId = useRef(0);
    const lastMarkedPos = useRef({ x: 5, y: 5 });
    const patternState = useRef({ xDir: 1, yTarget: 5, mode: "horizontal" as "horizontal" | "turning" });
    const sweepTargets = useRef({ ace: { x: 20, y: 20 }, inf: { x: 80, y: 80 } });

    // FPV render state (throttled for performance)
    const [fpvPos, setFpvPos] = useState({ x: 5, y: 5 });

    // --- Audio Engineering ---
    const initAudio = useCallback(() => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    }, []);

    const playDroneHum = useCallback((id: string, frequency: number, volume: number) => {
        if (!audioCtx.current || isMuted) return;
        if (!oscillators.current[id]) {
            const osc = audioCtx.current.createOscillator();
            const gain = audioCtx.current.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(frequency, audioCtx.current.currentTime);
            gain.gain.setValueAtTime(0, audioCtx.current.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.current.destination);
            osc.start();
            oscillators.current[id] = { osc, gain };
        }
        const { osc, gain } = oscillators.current[id];
        osc.frequency.setTargetAtTime(frequency, audioCtx.current.currentTime, 0.1);
        gain.gain.setTargetAtTime(volume * 0.05, audioCtx.current.currentTime, 0.1);
    }, [isMuted]);

    const stopAudio = useCallback(() => {
        Object.values(oscillators.current).forEach((node: { osc: OscillatorNode, gain: GainNode }) => {
            node.gain.gain.setTargetAtTime(0, audioCtx.current?.currentTime || 0, 0.1);
        });
    }, []);

    const playCrashSound = useCallback(() => {
        if (!audioCtx.current || isMuted) return;
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(150, audioCtx.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.current.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.current.destination);
        osc.start();
        osc.stop(audioCtx.current.currentTime + 0.3);
    }, [isMuted]);

    // Reset crash state when changing modes
    useEffect(() => {
        if (missionMode !== "dogfight") {
            crashedStateRef.current = false;
            setIsCrashed(false);
            dogfightTimerRef.current = 0;
        }
    }, [missionMode]);

    // --- Main Physics Loop (60fps) ---
    useEffect(() => {
        if (!isOpen) return;

        let animationFrameId: number;
        let lastTime = performance.now();
        let frameCount = 0;

        const loop = (time: number) => {
            const dt = (time - lastTime) / 1000; // seconds
            lastTime = time;
            frameCount++;

            // Physics constants
            const ACCEL = 0.3; // % per frame squared
            const FRICTION = 0.92;
            const MAX_SPEED = 2.0;

            const handlePhysics = (id: 'ACE' | 'INF', droneRef: typeof aceRef, keyMap: { up: string, down: string, left: string, right: string }) => {
                let { x, y, vx, vy, rot, battery } = droneRef.current;

                if (battery > 0 && missionMode === "manual") {
                    if (!isMuted) initAudio();

                    let isThrusting = false;
                    if (keys.current[keyMap.up]) { vy -= ACCEL; isThrusting = true; }
                    if (keys.current[keyMap.down]) { vy += ACCEL; isThrusting = true; }
                    if (keys.current[keyMap.left]) { vx -= ACCEL; isThrusting = true; }
                    if (keys.current[keyMap.right]) { vx += ACCEL; isThrusting = true; }

                    if (isThrusting) {
                        battery -= 0.02; // Drain battery while thrusting
                        playDroneHum(id, 100 + (Math.sqrt(vx * vx + vy * vy) * 20), 0.8);
                    } else {
                        playDroneHum(id, 60, 0.2); // idle hum
                    }
                }

                // Apply Friction & Speed Limit
                vx *= FRICTION;
                vy *= FRICTION;
                if (Math.abs(vx) < 0.01) vx = 0;
                if (Math.abs(vy) < 0.01) vy = 0;

                const speed = Math.sqrt(vx * vx + vy * vy);
                if (speed > MAX_SPEED) {
                    vx = (vx / speed) * MAX_SPEED;
                    vy = (vy / speed) * MAX_SPEED;
                }

                // Calculate Rotation based on velocity
                if (speed > 0.1) {
                    rot = Math.atan2(vy, vx) * (180 / Math.PI) + 90; // +90 because plane sprite points UP
                }

                x += vx;
                y += vy;

                // Wall Collisions
                if (x < 0) { x = 0; vx *= -0.8; }
                if (x > 100) { x = 100; vx *= -0.8; }
                if (y < 0) { y = 0; vy *= -0.8; }
                if (y > 100) { y = 100; vy *= -0.8; }

                // Obstacle Collisions
                OBSTACLES.forEach(obs => {
                    // Simple AABB Collision (assuming drone radius is ~2%)
                    const margin = 1.5;
                    if (x > obs.x - margin && x < obs.x + obs.w + margin &&
                        y > obs.y - margin && y < obs.y + obs.h + margin) {

                        // Determine which side was hit to reflect correctly
                        const dxLeft = Math.abs(x - obs.x);
                        const dxRight = Math.abs(x - (obs.x + obs.w));
                        const dyTop = Math.abs(y - obs.y);
                        const dyBottom = Math.abs(y - (obs.y + obs.h));

                        const min = Math.min(dxLeft, dxRight, dyTop, dyBottom);
                        if (min === dxLeft || min === dxRight) vx *= -1.5; // bouncy
                        else vy *= -1.5;

                        x += vx;
                        y += vy;
                        battery -= 5; // Damage
                        playCrashSound();
                        triggerSystemSignal(`${id} CRASH DETECTED: ${obs.name}`, "error");
                    }
                });

                droneRef.current = { x, y, vx, vy, rot, battery };

                // Direct DOM Update
                const domDrone = id === 'ACE' ? aceDroneRef.current : infDroneRef.current;
                if (domDrone) {
                    domDrone.style.left = `${x}%`;
                    domDrone.style.top = `${y}%`;
                    // Update rotation via CSS variable or direct transform on image
                    const img = domDrone.querySelector('img') || domDrone.querySelector('svg');
                    if (img) img.style.transform = `rotate(${rot}deg)`;
                }
            };

            // Process Physics
            if (missionMode === "manual") {
                handlePhysics('ACE', aceRef, { up: 'w', down: 's', left: 'a', right: 'd' });
                handlePhysics('INF', infRef, { up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' });
            } else if (missionMode === "survey") {
                // 1. ACE Lawnmower Auto Patrol
                let { x: ax, y: ay, vx: avx, vy: avy, rot: aRot, battery: aBat } = aceRef.current;
                const step = 0.15; // Adjusted for 60fps

                if (aBat > 0) {
                    if (patternState.current.mode === "horizontal") {
                        if (patternState.current.xDir === 1) {
                            if (ax < 95) { avx = step; avy = 0; }
                            else { patternState.current.mode = "turning"; patternState.current.yTarget = Math.min(95, ay + 15); patternState.current.xDir = -1; }
                        } else {
                            if (ax > 5) { avx = -step; avy = 0; }
                            else { patternState.current.mode = "turning"; patternState.current.yTarget = Math.min(95, ay + 15); patternState.current.xDir = 1; }
                        }
                    } else {
                        if (ay < patternState.current.yTarget) { avx = 0; avy = step; }
                        else patternState.current.mode = "horizontal";
                    }

                    // Obstacle avoidance for auto (naive push down)
                    OBSTACLES.forEach(obs => {
                        if (ax > obs.x - 5 && ax < obs.x + obs.w + 5 && ay > obs.y - 5 && ay < obs.y + obs.h + 5) {
                            avy = step;
                        }
                    });

                    ax += avx;
                    ay += avy;
                    aRot = Math.atan2(avy, avx) * (180 / Math.PI) + 90;
                    aBat = Math.max(0, aBat - 0.01);

                    aceRef.current = { x: ax, y: ay, vx: avx, vy: avy, rot: aRot, battery: aBat };

                    if (aceDroneRef.current) {
                        aceDroneRef.current.style.left = `${ax}%`;
                        aceDroneRef.current.style.top = `${ay}%`;
                        const img = aceDroneRef.current.querySelector('img') || aceDroneRef.current.querySelector('svg');
                        if (img) img.style.transform = `rotate(${aRot}deg)`;
                    }
                    playDroneHum("ACE", 120, 0.8);

                    // 2. ACE Marking Waypoints
                    const dMark = Math.sqrt(Math.pow(ax - lastMarkedPos.current.x, 2) + Math.pow(ay - lastMarkedPos.current.y, 2));
                    if (dMark > 18) {
                        const wpId = nextWaypointId.current++;
                        setWaypoints(prev => [...prev, { id: wpId, x: ax, y: ay, status: "pending" }]);
                        lastMarkedPos.current = { x: ax, y: ay };
                    }
                }

                // 3. INF Logic & Signals (Hunting waypoints)
                let { x: ix, y: iy, vx: ivx, vy: ivy, rot: iRot, battery: iBat } = infRef.current;
                let completedId: number | null = null;

                if (iBat > 0) {
                    setWaypoints(currentWps => {
                        const nextTarget = currentWps.find(wp => wp.status === "pending");
                        if (nextTarget) {
                            const iDx = nextTarget.x - ix;
                            const iDy = nextTarget.y - iy;
                            const iDist = Math.sqrt(iDx * iDx + iDy * iDy);

                            if (iDist > 1.5) {
                                const iStep = 0.25; // INF Speed
                                ivx = (iDx / iDist) * iStep;
                                ivy = (iDy / iDist) * iStep;

                                ix += ivx;
                                iy += ivy;
                                iRot = Math.atan2(ivy, ivx) * (180 / Math.PI) + 90;
                                iBat = Math.max(0, iBat - 0.02);

                                infRef.current = { x: ix, y: iy, vx: ivx, vy: ivy, rot: iRot, battery: iBat };

                                if (infDroneRef.current) {
                                    infDroneRef.current.style.left = `${ix}%`;
                                    infDroneRef.current.style.top = `${iy}%`;
                                    const img = infDroneRef.current.querySelector('img') || infDroneRef.current.querySelector('svg');
                                    if (img) img.style.transform = `rotate(${iRot}deg)`;
                                }
                                playDroneHum("INF", 120 + (iDist / 5), 0.8);

                                return currentWps;
                            } else {
                                completedId = nextTarget.id;
                                const newWps = currentWps.map(wp => wp.id === nextTarget.id ? { ...wp, status: "completed" as const } : wp);
                                setCompletedCount(newWps.filter(w => w.status === 'completed').length);
                                return newWps;
                            }
                        } else {
                            playDroneHum("INF", 60, 0.2); // Idle
                        }
                        return currentWps;
                    });
                }

                if (completedId !== null) {
                    triggerSystemSignal(`SECTOR_${completedId} VALIDATED`, "success");
                }

                // 4. Termination
                if (ay >= 94 && ax <= 6 && patternState.current.xDir === 1) {
                    setMissionMode("manual");
                    triggerSystemSignal("TACTICAL_SURVEY_COMPLETE", "success");
                }
            } else if (missionMode === "sweep") {
                ['ACE', 'INF'].forEach(id => {
                    const droneRef = id === 'ACE' ? aceRef : infRef;
                    const target = id === 'ACE' ? sweepTargets.current.ace : sweepTargets.current.inf;

                    let { x, y, vx, vy, rot, battery } = droneRef.current;
                    if (battery > 0) {
                        const dx = target.x - x;
                        const dy = target.y - y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 2) {
                            target.x = 5 + Math.random() * 90;
                            target.y = 5 + Math.random() * 90;
                        } else {
                            const step = id === 'ACE' ? 0.35 : 0.45;
                            vx = (dx / dist) * step;
                            vy = (dy / dist) * step;

                            x += vx;
                            y += vy;
                            rot = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
                            battery = Math.max(0, battery - 0.015);
                        }

                        droneRef.current = { x, y, vx, vy, rot, battery };
                        const dom = id === 'ACE' ? aceDroneRef.current : infDroneRef.current;
                        if (dom) {
                            dom.style.left = `${x}%`;
                            dom.style.top = `${y}%`;
                            const img = dom.querySelector('img') || dom.querySelector('svg');
                            if (img) img.style.transform = `rotate(${rot}deg)`;
                        }
                        playDroneHum(id, 140, 0.6);
                    }
                });
            } else if (missionMode === "dogfight") {
                let { x: ax, y: ay, vx: avx, vy: avy, rot: aRot, battery: aBat } = aceRef.current;
                let { x: ix, y: iy, vx: ivx, vy: ivy, rot: iRot, battery: iBat } = infRef.current;

                const dist = Math.sqrt(Math.pow(ax - ix, 2) + Math.pow(ay - iy, 2));

                if (dist < 3 && !crashedStateRef.current) {
                    crashedStateRef.current = true;
                    setIsCrashed(true);
                    triggerSystemSignal("TARGET INTERCEPTED! DOGFIGHT ENDED", "error");
                    playCrashSound();
                } else if (!crashedStateRef.current) {
                    if (aBat > 0) {
                        // Dogfight Timing
                        if (dogfightTimerRef.current === 0) dogfightTimerRef.current = Date.now();
                        const elapsed = Date.now() - dogfightTimerRef.current;
                        const isFatigued = elapsed > 10000; // After 10 seconds, ACE slows down

                        // ACE Evasion AI (Dash, Zig-Zag, and Drag)
                        const dx = ax - ix;
                        const dy = ay - iy;
                        const invDist = 1 / Math.max(dist, 1);
                        
                        // Base evasion (run away)
                        avx += (dx * invDist) * 0.08; 
                        avy += (dy * invDist) * 0.08;

                        // Perpendicular Evasive Zig-Zag! (Cross product of dx,dy)
                        const dodgePower = isFatigued ? 0.02 : 0.08;
                        avx += (-dy * invDist) * Math.sin(elapsed / 250) * dodgePower;
                        avy += (dx * invDist) * Math.sin(elapsed / 250) * dodgePower;

                        // Seek center
                        avx += (50 - ax) * 0.015;
                        avy += (50 - ay) * 0.015;
                        
                        // Wall repulsion
                        if (ax < 20) avx += 0.3; if (ax > 80) avx -= 0.3;
                        if (ay < 20) avy += 0.3; if (ay > 80) avy -= 0.3;
                        
                        // Random high-speed DASH (~1.5 seconds), disabled if fatigued
                        if (!isFatigued && Math.random() < 0.02) {
                            avx += (dx * invDist) * 3.5; 
                            avy += (dy * invDist) * 3.5;
                        }

                        // Organic Drag (allows bursts of speed that naturally slow down)
                        // If fatigued, drag becomes extremely high to slow ACE down
                        avx *= isFatigued ? 0.80 : 0.90;
                        avy *= isFatigued ? 0.80 : 0.90;

                        ax += avx; ay += avy;

                        // Prevent leaving bounds
                        if (ax < 5) ax = 5; if (ax > 95) ax = 95;
                        if (ay < 5) ay = 5; if (ay > 95) ay = 95;

                        aRot = Math.atan2(avy, avx) * (180 / Math.PI) + 90;
                        aBat = Math.max(0, aBat - 0.02);

                        aceRef.current = { x: ax, y: ay, vx: avx, vy: avy, rot: aRot, battery: aBat };

                        if (aceDroneRef.current) {
                            aceDroneRef.current.style.left = `${ax}%`;
                            aceDroneRef.current.style.top = `${ay}%`;
                            const img = aceDroneRef.current.querySelector('img') || aceDroneRef.current.querySelector('svg');
                            if (img) img.style.transform = `rotate(${aRot}deg)`;
                        }
                    }

                    if (iBat > 0) {
                        // INF Pursuit AI (Organic Acceleration)
                        const dx = ax - ix;
                        const dy = ay - iy;

                        // Accelerate towards ACE
                        ivx += (dx / dist) * 0.12;
                        ivy += (dy / dist) * 0.12;

                        // Less drag than ACE, so INF has a higher steady top speed to catch up
                        ivx *= 0.93;
                        ivy *= 0.93;

                        ix += ivx; iy += ivy;
                        iRot = Math.atan2(ivy, ivx) * (180 / Math.PI) + 90;
                        iBat = Math.max(0, iBat - 0.025);

                        infRef.current = { x: ix, y: iy, vx: ivx, vy: ivy, rot: iRot, battery: iBat };

                        if (infDroneRef.current) {
                            infDroneRef.current.style.left = `${ix}%`;
                            infDroneRef.current.style.top = `${iy}%`;
                            const img = infDroneRef.current.querySelector('img') || infDroneRef.current.querySelector('svg');
                            if (img) img.style.transform = `rotate(${iRot}deg)`;
                        }
                    }
                    playDroneHum("ACE", 160, 0.8);
                    playDroneHum("INF", 180, 0.8);
                }
            }

            // Trace Updates (Throttle to every 5 frames)
            if (frameCount % 5 === 0) {
                [{ id: 'ACE', ref: aceRef, traceRef: aceTraceRef, poly: acePolylineRef, tId: aceTraceId },
                { id: 'INF', ref: infRef, traceRef: infTraceRef, poly: infPolylineRef, tId: infTraceId }
                ].forEach(({ ref, traceRef, poly, tId }) => {
                    const newPoint = { x: ref.current.x, y: ref.current.y, id: tId.current++, timestamp: Date.now() };
                    traceRef.current.push(newPoint);
                    if (traceRef.current.length > 50) traceRef.current.shift(); // Keep trace short for performance
                    if (poly.current) poly.current.setAttribute('points', traceRef.current.map(p => `${p.x},${p.y}`).join(' '));
                });
            }

            // HUD State updates (Throttle to ~10fps)
            if (frameCount % 6 === 0) {
                setAceStats({ battery: aceRef.current.battery });
                setInfStats({ battery: infRef.current.battery });
                setFpvPos({ x: aceRef.current.x, y: aceRef.current.y });

                // Proximity Alarm
                const dist = Math.sqrt(Math.pow(aceRef.current.x - infRef.current.x, 2) + Math.pow(aceRef.current.y - infRef.current.y, 2));
                setCollisionWarning(dist < 10);
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            stopAudio();
        };
    }, [isOpen, missionMode, isMuted, playDroneHum, stopAudio, playCrashSound, showFPV]);

    // Keyboard Input Listeners
    useEffect(() => {
        if (missionMode !== "manual" || !isOpen) return;
        const downHandler = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
        const upHandler = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [missionMode, isOpen]);

    // Trace Cleanup effect
    useEffect(() => {
        const int = setInterval(() => {
            const now = Date.now();
            aceTraceRef.current = aceTraceRef.current.filter(t => now - t.timestamp < 3000);
            infTraceRef.current = infTraceRef.current.filter(t => now - t.timestamp < 3000);
        }, 1000);
        return () => clearInterval(int);
    }, []);

    if (!isOpen) return null;

    // View Filters
    let filterClass = "";
    if (viewMode === "night") filterClass = "sepia hue-rotate-[70deg] saturate-200 contrast-150 brightness-75";
    if (viewMode === "thermal") filterClass = "invert hue-rotate-180 saturate-200 contrast-150";

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 md:inset-8 z-[2000] bg-black/98 backdrop-blur-2xl md:border md:border-white/10 md:rounded-2xl overflow-hidden flex flex-col will-change-transform">
                {/* Header */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 z-50">
                    <div className="flex items-center gap-3 font-mono">
                        <Crosshair className={`text-mine ${missionMode !== "manual" ? "animate-spin" : "animate-pulse"}`} size={20} />
                        <div>
                            <span className="text-xs font-black text-white tracking-widest">DRONE_SIM_V5.0</span>
                            <div className="flex gap-4 text-[7px] text-white/40">
                                <span className={aceStats.battery < 20 ? "text-red-500 animate-pulse" : ""}>ACE_BAT: {Math.round(aceStats.battery)}%</span>
                                <span className={infStats.battery < 20 ? "text-red-500 animate-pulse" : ""}>INF_BAT: {Math.round(infStats.battery)}%</span>
                            </div>
                        </div>
                    </div>

                    {collisionWarning && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded text-[9px] text-red-400 font-bold animate-pulse">
                            <AlertTriangle size={12} /> PROXIMITY_CRITICAL: TCAS_ACTIVE
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {/* View Mode Toggle */}
                        <button
                            onClick={() => setViewMode(v => v === "normal" ? "night" : v === "night" ? "thermal" : "normal")}
                            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white text-[10px] transition-all"
                        >
                            <Eye size={14} /> {viewMode.toUpperCase()}
                        </button>

                        <button onClick={() => setIsMuted(!isMuted)} suppressHydrationWarning className={`p-2 rounded-full border transition-all ${isMuted ? 'text-white/40 border-white/10 hover:text-white' : 'text-mine border-mine shadow-[0_0_15px_rgba(56,255,66,0.2)]'}`}>
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>

                        {/* Mode Selector */}
                        <div className="hidden sm:flex bg-black/50 p-1 rounded-full border border-white/10">
                            {(["manual", "survey", "sweep", "dogfight"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setMissionMode(mode)}
                                    className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${missionMode === mode ? 'bg-mine text-black shadow-[0_0_10px_rgba(56,255,66,0.3)]' : 'text-white/40 hover:text-white'}`}
                                >
                                    {mode.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Mode Selector (Fallback) */}
                        <button suppressHydrationWarning
                            onClick={() => setMissionMode(v => v === "manual" ? "survey" : v === "survey" ? "sweep" : v === "sweep" ? "dogfight" : "manual")}
                            className={`sm:hidden px-3 py-1.5 rounded-full border text-[9px] font-black transition-all ${missionMode !== 'manual' ? 'bg-mine border-mine text-black' : 'bg-white/5 border-white/10 text-white'}`}
                        >
                            {missionMode.toUpperCase()}
                        </button>

                        <button suppressHydrationWarning onClick={onClose} className="p-1.5 text-white/40 hover:text-white transition-colors"><X size={20} /></button>
                    </div>
                </div>

                {/* Viewport */}
                <div ref={viewportRef} className={`flex-1 relative bg-zinc-950 overflow-hidden transition-all duration-700 ${filterClass}`}>
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#38ff42_1px,transparent_1px),linear-gradient(to_bottom,#38ff42_1px,transparent_1px)] [background-size:60px_60px]" />

                    {/* Obstacles */}
                    {OBSTACLES.map((obs, i) => (
                        <div key={`obs-${i}`} className="absolute bg-red-500/20 border border-red-500/50 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm" style={{ left: `${obs.x}%`, top: `${obs.y}%`, width: `${obs.w}%`, height: `${obs.h}%` }}>
                            <div className="w-full h-full opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #ef4444 10px, #ef4444 20px)" }} />
                            <span className="absolute text-[8px] font-mono text-red-400 font-bold rotate-90 md:rotate-0">{obs.name}</span>
                        </div>
                    ))}

                    {/* Traces */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <polyline ref={acePolylineRef} points="" fill="none" stroke="#38b6ff" strokeWidth="0.4" opacity="0.6" strokeDasharray="1 1" />
                        <polyline ref={infPolylineRef} points="" fill="none" stroke="#38ff42" strokeWidth="0.4" opacity="0.6" strokeDasharray="1 1" />
                    </svg>

                    {/* Drones */}
                    <div ref={aceDroneRef} style={{ left: `5%`, top: `5%` }} className="absolute -ml-5 -mt-5 md:-ml-8 md:-mt-8 z-20 will-change-[left,top]">
                        <DroneVisual color="#38b6ff" isWarning={collisionWarning} />
                    </div>
                    <div ref={infDroneRef} style={{ left: `95%`, top: `95%` }} className="absolute -ml-5 -mt-5 md:-ml-8 md:-mt-8 z-20 will-change-[left,top]">
                        <DroneVisual color="#38ff42" isWarning={collisionWarning} />
                    </div>

                    {/* Crash Restart Overlay */}
                    {isCrashed && missionMode === "dogfight" && (
                        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-red-950/60 backdrop-blur-sm pointer-events-auto">
                            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                                <h2 className="text-4xl font-black text-white drop-shadow-[0_0_20px_red] tracking-widest text-center">TARGET INTERCEPTED</h2>
                                <button 
                                    onClick={() => {
                                        crashedStateRef.current = false;
                                        dogfightTimerRef.current = 0;
                                        setIsCrashed(false);
                                        aceRef.current = { ...aceRef.current, x: 10, y: 10, vx: 0, vy: 0 };
                                        infRef.current = { ...infRef.current, x: 90, y: 90, vx: 0, vy: 0 };
                                        triggerSystemSignal("DOGFIGHT RESTARTED", "success");
                                    }}
                                    className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white text-sm font-black tracking-widest uppercase border-2 border-red-400 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95"
                                >
                                    RESTART DOGFIGHT
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mini-Map / FPV Widget */}
                    <div className="absolute top-6 left-6 p-2 bg-black/80 border border-white/10 rounded-lg backdrop-blur-xl z-50">
                        <div className="flex items-center justify-between gap-4 mb-2 border-b border-white/5 pb-1">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowFPV(!showFPV)}>
                                {showFPV ? <Camera size={10} className="text-blue-400" /> : <MapIcon size={10} className="text-mine" />}
                                <span className="text-[8px] font-black text-white/60 hover:text-white transition-colors">{showFPV ? "ACE_FPV_CAM" : "TACTICAL_MAP"}</span>
                            </div>
                        </div>

                        <div className="w-32 h-32 bg-zinc-950 overflow-hidden relative border border-white/10 rounded-sm">
                            {showFPV ? (
                                // FPV Camera Mode
                                <>
                                    <div
                                        className="absolute w-[400%] h-[400%] transition-transform duration-75 will-change-transform"
                                        style={{ transform: `translate(${-(fpvPos.x * 4) + 50}%, ${-(fpvPos.y * 4) + 50}%)`, transformOrigin: "top left" }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38ff42_1px,transparent_1px),linear-gradient(to_bottom,#38ff42_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                                        {OBSTACLES.map((obs, i) => (
                                            <div key={`fpv-obs-${i}`} className="absolute bg-red-500/40 border border-red-500" style={{ left: `${obs.x}%`, top: `${obs.y}%`, width: `${obs.w}%`, height: `${obs.h}%` }} />
                                        ))}
                                        {/* Other drone */}
                                        <div className="absolute w-4 h-4 bg-mine rounded-full shadow-[0_0_10px_#38ff42]" style={{ left: `${infStats.battery > 0 ? infRef.current.x : -10}%`, top: `${infStats.battery > 0 ? infRef.current.y : -10}%` }} />
                                    </div>
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
                                    <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 w-8 h-8" />
                                    <div className="absolute bottom-1 right-1 text-[6px] text-white/50 font-mono">REC •</div>
                                </>
                            ) : (
                                // Mini Map Mode
                                <>
                                    <div style={{ left: `${fpvPos.x}%`, top: `${fpvPos.y}%` }} className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_#38b6ff]" />
                                    <div style={{ left: `${infStats.battery > 0 ? infRef.current.x : -10}%`, top: `${infStats.battery > 0 ? infRef.current.y : -10}%` }} className="absolute w-1.5 h-1.5 bg-mine rounded-full shadow-[0_0_5px_#38ff42]" />
                                    {OBSTACLES.map((obs, i) => (
                                        <div key={`map-obs-${i}`} className="absolute bg-red-500/50" style={{ left: `${obs.x}%`, top: `${obs.y}%`, width: `${obs.w}%`, height: `${obs.h}%` }} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    {missionMode === "manual" && (
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between md:hidden py-4 border-t border-white/5 bg-black/40 backdrop-blur rounded-2xl px-4 z-50">
                            <MobilePad onMovePress={(dir) => { keys.current[dir === 'up' ? 'w' : dir === 'down' ? 's' : dir === 'left' ? 'a' : 'd'] = true; }} onMoveRelease={(dir) => { keys.current[dir === 'up' ? 'w' : dir === 'down' ? 's' : dir === 'left' ? 'a' : 'd'] = false; }} color="#38b6ff" label="ACE [WASD]" />
                            <MobilePad onMovePress={(dir) => { keys.current[dir === 'up' ? 'arrowup' : dir === 'down' ? 'arrowdown' : dir === 'left' ? 'arrowleft' : 'arrowright'] = true; }} onMoveRelease={(dir) => { keys.current[dir === 'up' ? 'arrowup' : dir === 'down' ? 'arrowdown' : dir === 'left' ? 'arrowleft' : 'arrowright'] = false; }} color="#38ff42" label="INF [ARROWS]" />
                        </div>
                    )}

                    {/* Instructions */}
                    {missionMode === "manual" && (
                        <div className="hidden lg:block absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 tracking-widest pointer-events-none">
                            MANUAL PILOT ENGAGED. USE [WASD] FOR ACE, [ARROWS] FOR INF. AVOID RED ZONES.
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 border-t border-white/5 bg-zinc-950 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-tighter z-50">
                    <div className="flex gap-4">
                        <span>SIGNAL_STRENGTH: 98%</span>
                        <span className="hidden sm:inline">LATENCY: 12ms</span>
                        <span>PHYSICS_ENGINE: ACTIVE (60FPS)</span>
                    </div>
                    <span>{viewMode}_OPTICS_ONLINE</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
});
