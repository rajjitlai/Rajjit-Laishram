"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Crosshair, X, Play, Pause, CheckCircle2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { triggerSystemSignal } from "./SystemToaster";

const DroneVisual = ({ color = "#38ff42" }: { color?: string }) => {
    const [imgError, setImgError] = useState(false);
    return !imgError ? (
        <img
            src="/drone.gif"
            alt="UAV"
            className="w-10 h-10 md:w-16 md:h-16 object-contain"
            onError={() => setImgError(true)}
            style={{
                filter: color === "#38ff42" ? "none" :
                    color === "#38b6ff" ? "hue-rotate(180deg) brightness(1.2)" :
                        "hue-rotate(280deg) brightness(1.2)"
            }}
        />
    ) : (
        <Plane size={32} style={{ color }} className="md:w-10 md:h-10" />
    );
};

interface TracePoint {
    x: number;
    y: number;
    id: number;
    timestamp: number;
}

interface Waypoint {
    id: number;
    x: number;
    y: number;
    status: "pending" | "completed";
}

const MobilePad = ({ onMove, color, label }: { onMove: (dir: string) => void, color: string, label: string }) => {
    return (
        <div className="flex flex-col items-center gap-1 opacity-80 md:hidden">
            <span className="text-[7px] font-mono mb-1 font-black" style={{ color }}>{label}</span>
            <div className="grid grid-cols-3 gap-1">
                <div />
                <button
                    onPointerDown={(e) => { e.preventDefault(); onMove('up'); }}
                    onClick={(e) => { e.preventDefault(); onMove('up'); }}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"
                >
                    <ChevronUp size={20} />
                </button>
                <div />
                <button
                    onPointerDown={(e) => { e.preventDefault(); onMove('left'); }}
                    onClick={(e) => { e.preventDefault(); onMove('left'); }}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onPointerDown={(e) => { e.preventDefault(); onMove('down'); }}
                    onClick={(e) => { e.preventDefault(); onMove('down'); }}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"
                >
                    <ChevronDown size={20} />
                </button>
                <button
                    onPointerDown={(e) => { e.preventDefault(); onMove('right'); }}
                    onClick={(e) => { e.preventDefault(); onMove('right'); }}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg active:bg-white/30 backdrop-blur-md"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

const UAVUnit = ({
    id,
    viewportRef,
    isAuto,
    pos,
    trace,
    activeColor
}: {
    id: string;
    viewportRef: React.RefObject<HTMLDivElement | null>;
    isAuto: boolean;
    pos: { x: number, y: number };
    trace: TracePoint[];
    activeColor: string;
}) => {
    // Trace optimization: Using polyline points string without percentages
    const polyPoints = useMemo(() => {
        return trace.map(p => `${p.x},${p.y}`).join(' ');
    }, [trace]);

    return (
        <>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            >
                {/* Simplified trace: Polyline for better performance */}
                <polyline
                    points={polyPoints}
                    fill="none"
                    stroke={activeColor}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.4"
                    className="transition-colors duration-500"
                />

                {/* Recent head trace for emphasis */}
                {trace.length > 5 && (
                    <polyline
                        points={trace.slice(-5).map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke={activeColor}
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="transition-colors duration-500"
                    />
                )}
            </svg>

            <motion.div
                className="absolute w-10 h-10 md:w-16 md:h-16 -ml-5 -mt-5 md:-ml-8 md:-mt-8 z-10"
                animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                transition={isAuto ? { type: "spring", damping: 25, stiffness: 120 } : { type: "tween", duration: 0.1 }}
            >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                    <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10 animate-ping" />
                    <div className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-75 md:scale-100">
                        <DroneVisual color={activeColor} />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export const UAVSimulation = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [isAuto, setIsAuto] = useState(false);

    // ACE State
    const [acePos, setAcePos] = useState({ x: 5, y: 5 });
    const aceRef = useRef({ x: 5, y: 5 });
    const [aceTrace, setAceTrace] = useState<TracePoint[]>([]);
    const aceTraceId = useRef(0);

    // INF State
    const [infPos, setInfPos] = useState({ x: 95, y: 95 });
    const infRef = useRef({ x: 95, y: 95 });
    const [infTrace, setInfTrace] = useState<TracePoint[]>([]);
    const infTraceId = useRef(0);

    // Points logic
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const nextWaypointId = useRef(0);
    const lastMarkedPos = useRef({ x: 5, y: 5 });

    // Lawnmower logic
    const patternState = useRef({ xDir: 1, yTarget: 5, mode: "horizontal" as "horizontal" | "turning" });

    // Shared Move Logic
    const moveUnit = useCallback((id: 'ACE' | 'INF', dir: string) => {
        const step = 3;
        const ref = id === 'ACE' ? aceRef : infRef;
        const setPos = id === 'ACE' ? setAcePos : setInfPos;
        const setTrace = id === 'ACE' ? setAceTrace : setInfTrace;
        const tid = id === 'ACE' ? aceTraceId : infTraceId;

        let { x, y } = ref.current;
        if (dir === 'up') y = Math.max(0, y - step);
        if (dir === 'down') y = Math.min(100, y + step);
        if (dir === 'left') x = Math.max(0, x - step);
        if (dir === 'right') x = Math.min(100, x + step);

        const newPos = { x, y };
        ref.current = newPos;
        setPos(newPos);
        setTrace(prev => [...prev, { ...newPos, id: tid.current++, timestamp: Date.now() }]);
    }, []);

    // Manual Controls: Keyboard
    useEffect(() => {
        if (isAuto || !isOpen) return;
        const handleKeys = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            // ACE: WASD
            if (key === 'w') moveUnit('ACE', 'up');
            if (key === 's') moveUnit('ACE', 'down');
            if (key === 'a') moveUnit('ACE', 'left');
            if (key === 'd') moveUnit('ACE', 'right');
            // INF: IJKL
            if (key === 'i') moveUnit('INF', 'up');
            if (key === 'k') moveUnit('INF', 'down');
            if (key === 'j') moveUnit('INF', 'left');
            if (key === 'l') moveUnit('INF', 'right');

            if (['w', 'a', 's', 'd', 'i', 'j', 'k', 'l'].includes(key)) e.preventDefault();
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [isAuto, isOpen, moveUnit]);

    useEffect(() => {
        if (!isAuto) return;

        const interval = setInterval(() => {
            // 1. ACE Lawnmower Movement
            let { x, y } = aceRef.current;
            const step = 0.6;

            if (patternState.current.mode === "horizontal") {
                if (patternState.current.xDir === 1) {
                    if (x < 95) x += step;
                    else {
                        patternState.current.mode = "turning";
                        patternState.current.yTarget = Math.min(95, y + 15);
                        patternState.current.xDir = -1;
                    }
                } else {
                    if (x > 5) x -= step;
                    else {
                        patternState.current.mode = "turning";
                        patternState.current.yTarget = Math.min(95, y + 15);
                        patternState.current.xDir = 1;
                    }
                }
            } else {
                if (y < patternState.current.yTarget) y += step;
                else patternState.current.mode = "horizontal";
            }

            const newAcePos = { x, y };
            aceRef.current = newAcePos;
            setAcePos(newAcePos);
            setAceTrace(prev => [...prev, { ...newAcePos, id: aceTraceId.current++, timestamp: Date.now() }]);

            // 2. ACE Marking Logic
            const dMark = Math.sqrt(Math.pow(x - lastMarkedPos.current.x, 2) + Math.pow(y - lastMarkedPos.current.y, 2));
            if (dMark > 18) {
                const wpId = nextWaypointId.current++;
                setWaypoints(prev => [...prev, { id: wpId, x, y, status: "pending" }]);
                lastMarkedPos.current = { x, y };
            }

            // 3. INF Displacement Logic
            let completedId: number | null = null;
            setWaypoints(currentWps => {
                const nextTarget = currentWps.find(wp => wp.status === "pending");
                if (nextTarget) {
                    let { x: ix, y: iy } = infRef.current;
                    const iDx = nextTarget.x - ix;
                    const iDy = nextTarget.y - iy;
                    const iDist = Math.sqrt(iDx * iDx + iDy * iDy);

                    if (iDist > 1.5) {
                        const iStep = 1.6;
                        ix += (iDx / iDist) * iStep;
                        iy += (iDy / iDist) * iStep;
                        const newInfPos = { x: ix, y: iy };
                        infRef.current = newInfPos;
                        setInfPos(newInfPos);
                        setInfTrace(prev => [...prev, { ...newInfPos, id: infTraceId.current++, timestamp: Date.now() }]);
                        return currentWps;
                    } else {
                        completedId = nextTarget.id;
                        return currentWps.map(wp => wp.id === nextTarget.id ? { ...wp, status: "completed" } : wp);
                    }
                }
                return currentWps;
            });

            if (completedId !== null) {
                triggerSystemSignal(`SECTOR_${completedId} VALIDATED`, "success");
            }

            // End mission check: if ACE reaches bottom-left after completing survey
            if (y >= 94 && x <= 6 && patternState.current.xDir === 1) {
                setIsAuto(false);
                triggerSystemSignal("TACTICAL_SURVEY_COMPLETE", "success");
            }
        }, 60);

        return () => clearInterval(interval);
    }, [isAuto]);

    // Efficient Trace Decay
    useEffect(() => {
        const int = setInterval(() => {
            const now = Date.now();
            setAceTrace(p => p.filter(t => now - t.timestamp < 6000));
            setInfTrace(p => p.filter(t => now - t.timestamp < 6000));
        }, 1200);
        return () => clearInterval(int);
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 md:inset-8 z-[2000] bg-black/98 backdrop-blur-2xl md:border md:border-white/10 md:rounded-2xl overflow-hidden flex flex-col"
            >
                {/* Header: Responsive */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <Crosshair className="text-mine animate-pulse w-4 h-4 md:w-5 md:h-5" />
                        <div>
                            <span className="text-[10px] md:text-xs font-black text-white uppercase font-mono tracking-wider">PROJECT_NEBULA_V3.5</span>
                            <div className="hidden md:flex gap-4 mt-0.5">
                                <span className="text-[7px] text-blue-400/60 font-mono">ACE_UNIT: SURVEYOR</span>
                                <span className="text-[7px] text-mine/60 font-mono">INF_UNIT: VALIDATOR</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsAuto(!isAuto)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-6 md:py-2 rounded-full border transition-all pointer-events-auto ${isAuto ? 'bg-mine border-mine text-black font-black' : 'bg-white/5 border-white/10 text-white hover:border-mine/50'}`}
                        >
                            {isAuto ? <Pause size={12} /> : <Play size={12} />}
                            <span className="text-[9px] md:text-[10px] uppercase font-bold">Auto</span>
                        </button>
                        <button onClick={onClose} className="p-1.5 md:p-2 text-white/40 hover:text-white transition-colors pointer-events-auto">
                            <X size={20} className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* Viewport: Responsive */}
                <div ref={viewportRef} className="flex-1 relative bg-zinc-950 overflow-hidden cursor-crosshair">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38ff42_1px,transparent_1px),linear-gradient(to_bottom,#38ff42_1px,transparent_1px)] [background-size:40px_40px] md:background-size:80px_80px]" />
                    </div>

                    {/* Waypoints Render */}
                    {waypoints.map(wp => (
                        <div
                            key={wp.id}
                            style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                            className="absolute w-3 h-3 md:w-4 md:h-4 -ml-1.5 -mt-1.5 md:-ml-2 md:-mt-2 z-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border ${wp.status === 'completed' ? 'bg-mine border-mine shadow-[0_0_8px_#38ff42]' : 'bg-blue-500 border-blue-400 animate-pulse'}`} />
                            {wp.status === 'completed' && <CheckCircle2 className="absolute text-mine opacity-50 w-2 h-2 md:w-3 md:h-3" />}
                        </div>
                    ))}

                    <UAVUnit id="ACE" viewportRef={viewportRef} isAuto={isAuto} pos={acePos} trace={aceTrace} activeColor="#38b6ff" />
                    <UAVUnit id="INF" viewportRef={viewportRef} isAuto={isAuto} pos={infPos} trace={infTrace} activeColor="#38ff42" />

                    {/* Mobile Controls Overlay */}
                    {!isAuto && (
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between md:hidden pointer-events-none">
                            <div className="pointer-events-auto">
                                <MobilePad onMove={(dir) => moveUnit('ACE', dir)} color="#38b6ff" label="ACE_W_A_S_D" />
                            </div>
                            <div className="pointer-events-auto">
                                <MobilePad onMove={(dir) => moveUnit('INF', dir)} color="#38ff42" label="INF_I_J_K_L" />
                            </div>
                        </div>
                    )}

                    {/* Desktop Legend */}
                    <div className="hidden md:flex absolute top-6 right-6 flex-col gap-2 pointer-events-none uppercase">
                        <div className="bg-black/90 p-3 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#38b6ff]" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white font-black font-mono">UNIT_ACE [SURVEYOR]</span>
                                    <span className="text-[7px] text-white/40 font-mono italic">CONTROL: [W][A][S][D]</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-mine shadow-[0_0_8px_#38ff42]" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white font-black font-mono">UNIT_INF [VALIDATOR]</span>
                                    <span className="text-[7px] text-white/40 font-mono italic">CONTROL: [I][J][K][L]</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-pulse" />
                                    <span className="text-[7px] text-white/30">PENDING_SECTOR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-mine/40 rounded-full" />
                                    <span className="text-[7px] text-white/30">VALIDATED_SECTOR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer: Stats Overlay */}
                <div className="px-4 py-2 border-t border-white/5 bg-zinc-950 flex justify-between items-center text-[7px] md:text-[8px] font-mono text-white/20 uppercase tracking-widest">
                    <span>Environmental: Nominal</span>
                    <span className="hidden sm:block">UAV_Coordination_Link: Established</span>
                    <span>Waypoints: {waypoints.filter(w => w.status === 'completed').length}/{waypoints.length}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
