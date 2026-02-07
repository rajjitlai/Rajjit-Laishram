"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Crosshair, X, CheckCircle2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Battery, AlertTriangle, Map as MapIcon, Volume2, VolumeX } from "lucide-react";
import { triggerSystemSignal } from "./SystemToaster";

// --- Sub-Components ---

const DroneVisual = ({ color = "#38b6ff", isWarning = false }: { color?: string, isWarning?: boolean }) => {
    const [imgError, setImgError] = useState(false);
    return !imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src="/drone.gif"
            alt="UAV"
            className={`w-10 h-10 md:w-16 md:h-16 object-contain transition-all duration-300 ${isWarning ? "brightness-150 scale-110 drop-shadow-[0_0_15px_#ff0000]" : ""}`}
            onError={() => setImgError(true)}
            style={{ filter: isWarning ? "none" : (color === "#38ff42" ? "none" : color === "#38b6ff" ? "hue-rotate(180deg) brightness(1.2)" : "hue-rotate(280deg) brightness(1.2)") }}
        />
    ) : (
        <Plane size={32} style={{ color: isWarning ? "#ff3333" : color }} className="md:w-10 md:h-10" />
    );
};

const MobilePad = ({ onMove, color, label }: { onMove: (dir: string) => void, color: string, label: string }) => {
    return (
        <div className="flex flex-col items-center gap-1 opacity-80 md:hidden">
            <span className="text-[7px] font-mono mb-1 font-black" style={{ color }}>{label}</span>
            <div className="grid grid-cols-3 gap-1">
                <div />
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMove('up'); }} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronUp size={20} /></button>
                <div />
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMove('left'); }} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronLeft size={20} /></button>
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMove('down'); }} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronDown size={20} /></button>
                <button suppressHydrationWarning onPointerDown={(e) => { e.preventDefault(); onMove('right'); }} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

// --- Main Simulation ---

interface TracePoint { x: number; y: number; id: number; timestamp: number; }
interface Waypoint { id: number; x: number; y: number; status: "pending" | "completed"; }

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

    // Core Simulation State (kept for non-frequency updates or triggers)
    const [isAuto, setIsAuto] = useState(false);
    const [collisionWarning, setCollisionWarning] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [aceStats, setAceStats] = useState({ battery: 100 });
    const [infStats, setInfStats] = useState({ battery: 100 });
    const [completedCount, setCompletedCount] = useState(0);

    const aceRef = useRef({ x: 5, y: 5, battery: 100 });
    const infRef = useRef({ x: 95, y: 95, battery: 100 });
    const aceTraceId = useRef(0);
    const infTraceId = useRef(0);

    // Mission State
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const nextWaypointId = useRef(0);
    const lastMarkedPos = useRef({ x: 5, y: 5 });
    const patternState = useRef({ xDir: 1, yTarget: 5, mode: "horizontal" as "horizontal" | "turning" });

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

    // Helper to update DOM nodes directly
    const updateUnitDOM = useCallback((id: 'ACE' | 'INF', x: number, y: number) => {
        const drone = id === 'ACE' ? aceDroneRef.current : infDroneRef.current;
        const polyline = id === 'ACE' ? acePolylineRef.current : infPolylineRef.current;
        const trace = id === 'ACE' ? aceTraceRef.current : infTraceRef.current;

        if (drone) {
            drone.style.left = `${x}%`;
            drone.style.top = `${y}%`;
        }
        if (polyline) {
            const newPoint = { x, y, id: id === 'ACE' ? aceTraceId.current++ : infTraceId.current++, timestamp: Date.now() };
            trace.push(newPoint);
            // Limit trace length for performance
            if (trace.length > 200) trace.shift();
            polyline.setAttribute('points', trace.map(p => `${p.x},${p.y}`).join(' '));
        }
    }, []);

    // --- Mechanics ---
    const moveUnit = useCallback((id: 'ACE' | 'INF', dir: string) => {
        initAudio();
        const step = 3;
        const ref = id === 'ACE' ? aceRef : infRef;
        const setStats = id === 'ACE' ? setAceStats : setInfStats;

        if (ref.current.battery <= 0) {
            triggerSystemSignal(`${id}_UNIT POWER_DEPLETED`, "warning");
            return;
        }

        let { x, y } = ref.current;
        if (dir === 'up') y = Math.max(0, y - step);
        if (dir === 'down') y = Math.min(100, y + step);
        if (dir === 'left') x = Math.max(0, x - step);
        if (dir === 'right') x = Math.min(100, x + step);

        ref.current.x = x;
        ref.current.y = y;
        ref.current.battery = Math.max(0, ref.current.battery - 0.1);

        updateUnitDOM(id, x, y);
        setStats({ battery: ref.current.battery });

        playDroneHum(id, 80 + (dir === 'up' || dir === 'down' ? 40 : 20), 1);
    }, [initAudio, playDroneHum, updateUnitDOM]);

    // --- Main Simulation Loop ---
    useEffect(() => {
        if (!isAuto) {
            stopAudio();
            return;
        }
        if (!isMuted) initAudio();

        const interval = setInterval(() => {
            // 1. ACE Lawnmower Movement
            let { x, y, battery: aBat } = aceRef.current;
            const step = 0.6;
            if (aBat > 0) {
                if (patternState.current.mode === "horizontal") {
                    if (patternState.current.xDir === 1) {
                        if (x < 95) x += step;
                        else { patternState.current.mode = "turning"; patternState.current.yTarget = Math.min(95, y + 15); patternState.current.xDir = -1; }
                    } else {
                        if (x > 5) x -= step;
                        else { patternState.current.mode = "turning"; patternState.current.yTarget = Math.min(95, y + 15); patternState.current.xDir = 1; }
                    }
                } else {
                    if (y < patternState.current.yTarget) y += step;
                    else patternState.current.mode = "horizontal";
                }
                aBat = Math.max(0, aBat - 0.05);
                aceRef.current = { x, y, battery: aBat };
                updateUnitDOM('ACE', x, y);
                setAceStats({ battery: aBat });
                playDroneHum("ACE", 100 + (Math.abs(step) * 20), 0.8);
            }

            // 2. ACE Marking
            const dMark = Math.sqrt(Math.pow(x - lastMarkedPos.current.x, 2) + Math.pow(y - lastMarkedPos.current.y, 2));
            if (dMark > 18 && aBat > 0) {
                const wpId = nextWaypointId.current++;
                setWaypoints(prev => [...prev, { id: wpId, x, y, status: "pending" }]);
                lastMarkedPos.current = { x, y };
            }

            // 3. INF Logic & Signals
            let completedId: number | null = null;
            let { x: ix, y: iy, battery: iBat } = infRef.current;
            if (iBat > 0) {
                setWaypoints((currentWps: Waypoint[]) => {
                    const nextTarget = currentWps.find(wp => wp.status === "pending");
                    if (nextTarget) {
                        const iDx = nextTarget.x - ix; const iDy = nextTarget.y - iy; const iDist = Math.sqrt(iDx * iDx + iDy * iDy);
                        if (iDist > 1.5) {
                            const iStep = 1.6; ix += (iDx / iDist) * iStep; iy += (iDy / iDist) * iStep;
                            iBat = Math.max(0, iBat - 0.08);
                            infRef.current = { x: ix, y: iy, battery: iBat };
                            updateUnitDOM('INF', ix, iy);
                            setInfStats({ battery: iBat });
                            playDroneHum("INF", 120 + (iDist / 5), 0.8);
                            return currentWps;
                        } else {
                            completedId = nextTarget.id;
                            const newWps = currentWps.map(wp => wp.id === nextTarget.id ? { ...wp, status: "completed" as const } : wp);
                            setCompletedCount(newWps.filter(w => w.status === 'completed').length);
                            return newWps;
                        }
                    }
                    return currentWps;
                });
            }

            if (completedId !== null) triggerSystemSignal(`SECTOR_${completedId} VALIDATED`, "success");

            // 4. TCAS Collision Matrix
            const dist = Math.sqrt(Math.pow(x - ix, 2) + Math.pow(y - iy, 2));
            setCollisionWarning(dist < 10);
            if (dist < 5) triggerSystemSignal("TCAS_ALARM: PROXIMITY_ALERT", "warning");

            // 5. Termination
            if (y >= 94 && x <= 6 && patternState.current.xDir === 1) {
                setIsAuto(false);
                triggerSystemSignal("TACTICAL_SURVEY_COMPLETE", "success");
            }
        }, 60);
        return () => { clearInterval(interval); stopAudio(); };
    }, [isAuto, isMuted, initAudio, playDroneHum, stopAudio, updateUnitDOM]);

    // Trace Cleanup effect
    useEffect(() => {
        const int = setInterval(() => {
            const now = Date.now();
            aceTraceRef.current = aceTraceRef.current.filter(t => now - t.timestamp < 10000);
            infTraceRef.current = infTraceRef.current.filter(t => now - t.timestamp < 10000);
        }, 1200);
        return () => clearInterval(int);
    }, []);

    useEffect(() => {
        if (isMuted) stopAudio();
    }, [isMuted, stopAudio]);

    // Desktop Key Listeners
    useEffect(() => {
        if (isAuto || !isOpen) return;
        const h = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();
            if (['w', 'a', 's', 'd'].includes(k)) moveUnit('ACE', k === 'w' ? 'up' : k === 's' ? 'down' : k === 'a' ? 'left' : 'right');
            if (['i', 'j', 'k', 'l'].includes(k)) moveUnit('INF', k === 'i' ? 'up' : k === 'k' ? 'down' : k === 'j' ? 'left' : 'right');
            if (['w', 'a', 's', 'd', 'i', 'j', 'k', 'l'].includes(k)) e.preventDefault();
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [isAuto, isOpen, moveUnit]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 md:inset-8 z-[2000] bg-black/98 backdrop-blur-2xl md:border md:border-white/10 md:rounded-2xl overflow-hidden flex flex-col will-change-transform">
                {/* Header */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-3 font-mono">
                        <Crosshair className={`text-mine ${isAuto ? "animate-spin" : "animate-pulse"}`} size={20} />
                        <div>
                            <span className="text-xs font-black text-white tracking-widest">PROJECT_NEBULA_V4.0</span>
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
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            suppressHydrationWarning
                            className={`p-2 rounded-full border transition-all ${isMuted ? 'text-white/40 border-white/10 hover:text-white' : 'text-mine border-mine shadow-[0_0_15px_rgba(56,255,66,0.2)]'}`}
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <button suppressHydrationWarning onClick={() => setIsAuto(!isAuto)} className={`px-4 py-1.5 rounded-full border text-[10px] font-black transition-all ${isAuto ? 'bg-mine border-mine text-black' : 'bg-white/5 border-white/10 text-white'}`}>
                            {isAuto ? 'TERMINATE_AUTO' : 'ENGAGE_AUTO'}
                        </button>
                        <button suppressHydrationWarning onClick={onClose} className="p-1.5 text-white/40 hover:text-white transition-colors"><X size={20} /></button>
                    </div>
                </div>

                {/* Viewport */}
                <div ref={viewportRef} className="flex-1 relative bg-zinc-950 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#38ff42_1px,transparent_1px),linear-gradient(to_bottom,#38ff42_1px,transparent_1px)] [background-size:60px_60px]" />

                    {/* Render Content */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <polyline ref={acePolylineRef} points="" fill="none" stroke="#38b6ff" strokeWidth="0.4" opacity="0.4" />
                        <polyline ref={infPolylineRef} points="" fill="none" stroke="#38ff42" strokeWidth="0.4" opacity="0.4" />
                    </svg>

                    {waypoints.map(wp => (
                        <div key={wp.id} style={{ left: `${wp.x}%`, top: `${wp.y}%` }} className="absolute w-4 h-4 -ml-2 -mt-2 flex items-center justify-center">
                            <motion.div animate={wp.status === 'completed' ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : { scale: [1, 1.2, 1] }} className={`w-2 h-2 rounded-full border ${wp.status === 'completed' ? 'bg-mine border-mine shadow-[0_0_15px_#38ff42]' : 'bg-blue-500 border-blue-400 opacity-50'}`} />
                            {wp.status === 'completed' && <CheckCircle2 className="absolute text-mine opacity-50 w-3 h-3" />}
                        </div>
                    ))}

                    {/* Drones */}
                    <div ref={aceDroneRef} style={{ left: `5%`, top: `5%` }} className="absolute -ml-5 -mt-5 md:-ml-8 md:-mt-8 z-20 will-change-[left,top]">
                        <DroneVisual color="#38b6ff" isWarning={collisionWarning} />
                    </div>
                    <div ref={infDroneRef} style={{ left: `95%`, top: `95%` }} className="absolute -ml-5 -mt-5 md:-ml-8 md:-mt-8 z-20 will-change-[left,top]">
                        <DroneVisual color="#38ff42" isWarning={collisionWarning} />
                    </div>

                    {/* Mini-Map */}
                    <div className="absolute top-6 left-6 p-2 bg-black/80 border border-white/10 rounded-lg backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1">
                            <MapIcon size={10} className="text-mine" />
                            <span className="text-[8px] font-black text-white/60">TACTICAL_POSITIONING</span>
                        </div>
                        <div className="w-24 h-24 bg-zinc-900 overflow-hidden relative border border-white/5">
                            {/* Minimap points still using state/refs combo effectively here since it's small */}
                            <div style={{ left: `${aceRef.current.x}%`, top: `${aceRef.current.y}%` }} className="absolute w-1 h-1 bg-blue-400 rounded-full" />
                            <div style={{ left: `${infRef.current.x}%`, top: `${infRef.current.y}%` }} className="absolute w-1 h-1 bg-mine rounded-full" />
                            {waypoints.map(wp => (
                                <div key={`map-${wp.id}`} style={{ left: `${wp.x}%`, top: `${wp.y}%` }} className={`absolute w-0.5 h-0.5 rounded-full ${wp.status === 'completed' ? 'bg-mine/40' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    {!isAuto && (
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between md:hidden py-4 border-t border-white/5 bg-black/40 backdrop-blur rounded-2xl px-4">
                            <MobilePad onMove={(dir) => moveUnit('ACE', dir)} color="#38b6ff" label="ACE [WASD]" />
                            <MobilePad onMove={(dir) => moveUnit('INF', dir)} color="#38ff42" label="INF [IJKL]" />
                        </div>
                    )}

                    {/* Legend */}
                    <div className="hidden lg:flex absolute bottom-6 right-6 flex-col gap-3 p-4 bg-black/90 border border-white/10 rounded-xl font-mono">
                        <div className="flex items-center gap-3"><Battery className="text-blue-400" size={14} /> <span className="text-[10px] text-white">ACE_SURVEYOR: {Math.round(aceStats.battery)}%</span></div>
                        <div className="flex items-center gap-3"><Battery className="text-mine" size={14} /> <span className="text-[10px] text-white">INF_VALIDATOR: {Math.round(infStats.battery)}%</span></div>
                        <div className="pt-2 border-t border-white/5 space-y-1">
                            <div className="flex items-center gap-2 text-[8px] text-white/30 truncate max-w-[150px]">LATEST_UPLINK: ...SECURE</div>
                            <div className="flex items-center gap-2 text-[8px] text-white/30 truncate max-w-[150px]">ENVIRONMENT: NOMINAL</div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 border-t border-white/5 bg-zinc-950 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-tighter">
                    <div className="flex gap-4">
                        <span>SIGNAL_STRENGTH: 98%</span>
                        <span className="hidden sm:inline">LATENCY: 12ms</span>
                    </div>
                    <span>WAYPOINTS_CLEARANCE: {completedCount}/{waypoints.length}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
});
