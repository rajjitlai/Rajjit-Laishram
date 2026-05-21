"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame, useTransform } from "framer-motion";
import { Plane, Crosshair } from "lucide-react";
import { triggerSystemSignal } from "./SystemToaster";

export type UAVMode = "patrol" | "return" | "scan" | "stealth" | "manual" | "escort" | "intercept";

interface Anomaly {
    id: string;
    x: number;
    y: number;
}

interface DroneProps {
    id: string;
    index: number;
    mode: UAVMode;
    dimensions: { width: number; height: number };
    mousePos: { x: number; y: number };
    manualPos: { x: number; y: number };
    anomalies: Anomaly[];
    onAnomalyIntercepted: (id: string) => void;
}

const Drone = ({ id, index, mode, dimensions, mousePos, manualPos, anomalies, onAnomalyIntercepted }: DroneProps) => {
    // Spatial values
    const x = useMotionValue(dimensions.width ? Math.random() * dimensions.width : 500);
    const y = useMotionValue(dimensions.height ? Math.random() * dimensions.height : 500);
    const rotate = useMotionValue(0);
    const opacity = useMotionValue(1);
    const scale = useMotionValue(1);
    
    // Battery & Logic Values (No React State to avoid re-renders)
    const battery = useMotionValue(60 + Math.random() * 40); // Random start battery 60-100%
    const isRecharging = useMotionValue(false);
    const isReturningToBase = useMotionValue(false);
    const landedPos = useRef({ x: 0, y: 0 });
    
    // Random drain multiplier per drone (0.8x to 2x drain speed)
    const drainMultiplier = useRef(0.8 + Math.random() * 1.2).current;

    // Smooth physical springs
    const springX = useSpring(x, { stiffness: 40, damping: 25, mass: 1 + index * 0.2 });
    const springY = useSpring(y, { stiffness: 40, damping: 25, mass: 1 + index * 0.2 });
    const springRotate = useSpring(rotate, { stiffness: 80, damping: 20 });

    // Battery display transforms
    const batteryWidth = useTransform(battery, [0, 100], ["0%", "100%"]);
    const batteryColor = useTransform(battery, [0, 20, 21, 100], ["#ef4444", "#ef4444", "#38ff42", "#38ff42"]); // Red below 20%, Green above
    
    // Local state just for conditional rendering (Lidar cone, text)
    const [chargingState, setChargingState] = useState(false);
    useEffect(() => {
        return isRecharging.on("change", (v) => setChargingState(v));
    }, [isRecharging]);

    const [isLowBattery, setIsLowBattery] = useState(false);
    useEffect(() => {
        return battery.on("change", (v) => setIsLowBattery(v < 20));
    }, [battery]);

    // Logic loop
    useAnimationFrame((t, delta) => {
        if (!dimensions.width) return;
        
        let targetX = x.get();
        let targetY = y.get();
        let targetOpacity = 1;
        let targetScale = 1;
        
        const currentBattery = battery.get();
        const currentlyRecharging = isRecharging.get();

        // Check if we need to start recharging in-place
        if (currentBattery < 5 && !currentlyRecharging) {
            isRecharging.set(true);
            landedPos.current = { x: x.get(), y: y.get() };
        }

        if (currentlyRecharging) {
            // Stay in place to recharge using page background
            targetX = landedPos.current.x;
            targetY = landedPos.current.y;
            targetScale = 0.6; // Scale down slightly to look "landed"
            
            // Recharge fast (takes about 10 seconds to fully recharge)
            const nextBattery = currentBattery + (0.015 * delta);
            battery.set(Math.min(100, nextBattery));
            
            if (nextBattery >= 100) {
                isRecharging.set(false); // Done charging, take off again
            }
        } 
        else if (mode === "stealth") {
            targetOpacity = 0;
            battery.set(Math.max(0, currentBattery - (0.001 * delta * drainMultiplier)));
        }
        else if (mode === "return") { 
            // If user explicitly types /uav return, they go to the top left base
            targetX = 40 + (index * 80);
            targetY = 40;
            targetOpacity = 0.8;
            targetScale = 0.6;
            // Charge at base if they are there
            if (Math.abs(x.get() - targetX) < 20 && Math.abs(y.get() - targetY) < 20) {
                 battery.set(Math.min(100, currentBattery + (0.015 * delta)));
            }
        }
        else if (mode === "escort") {
            const offsets = [ { dx: 0, dy: -60 }, { dx: -80, dy: 60 }, { dx: 80, dy: 60 } ];
            targetX = mousePos.x + offsets[index % 3].dx;
            targetY = mousePos.y + offsets[index % 3].dy;
            battery.set(Math.max(0, currentBattery - (0.01 * delta * drainMultiplier)));
        }
        else if (mode === "manual") {
            const offsets = [ { dx: 0, dy: 0 }, { dx: -40, dy: 40 }, { dx: 40, dy: 40 } ];
            targetX = manualPos.x + offsets[index % 3].dx;
            targetY = manualPos.y + offsets[index % 3].dy;
            battery.set(Math.max(0, currentBattery - (0.01 * delta * drainMultiplier)));
        }
        else if (mode === "scan") {
            const sectorWidth = dimensions.width / 3;
            const mySectorCenterX = (sectorWidth * index) + (sectorWidth / 2);
            const time = t / 1500;
            targetX = mySectorCenterX + Math.sin(time * 0.5) * (sectorWidth * 0.4);
            targetY = dimensions.height / 2 + Math.cos(time) * (dimensions.height * 0.4);
            battery.set(Math.max(0, currentBattery - (0.005 * delta * drainMultiplier)));
        }
        else if (mode === "intercept") {
            if (anomalies.length > 0) {
                const targetAnomaly = anomalies[index % anomalies.length];
                targetX = targetAnomaly.x;
                targetY = targetAnomaly.y;
                const dx = x.get() - targetX;
                const dy = y.get() - targetY;
                if (Math.sqrt(dx*dx + dy*dy) < 40) {
                    onAnomalyIntercepted(targetAnomaly.id);
                }
                battery.set(Math.max(0, currentBattery - (0.02 * delta * drainMultiplier))); // High drain
            } else {
                const time = t / 2000;
                targetX = dimensions.width / 2 + Math.sin(time + index) * dimensions.width * 0.3;
                targetY = dimensions.height / 2 + Math.cos(time * 0.8 + index) * dimensions.height * 0.3;
            }
        }
        else { // patrol
            const time = t / 3000;
            targetX = dimensions.width / 2 + Math.sin(time + index * 2) * dimensions.width * 0.4;
            targetY = dimensions.height / 2 + Math.sin(time * 0.7 + index * 1.5) * dimensions.height * 0.4;
            battery.set(Math.max(0, currentBattery - (0.002 * delta * drainMultiplier))); // Slow drain
        }

        // Calculate heading (rotation) - only if we are moving significantly and NOT recharging
        if (!currentlyRecharging) {
            const dxRot = targetX - x.get();
            const dyRot = targetY - y.get();
            if (Math.abs(dxRot) > 1 || Math.abs(dyRot) > 1) {
                let angle = Math.atan2(dyRot, dxRot) * (180 / Math.PI);
                angle += 45; // The Lucide Plane icon points top-right (45 degrees) by default
                
                const currentRot = rotate.get();
                let diff = angle - currentRot;
                while (diff < -180) diff += 360;
                while (diff > 180) diff -= 360;
                rotate.set(currentRot + diff);
            }
        }

        // Limit the maximum speed the target can move from the current position
        // This prevents the "pong-ball" launch effect when returning from the charging pad
        const currentX = x.get();
        const currentY = y.get();
        const dxLimit = targetX - currentX;
        const dyLimit = targetY - currentY;
        const distToTarget = Math.sqrt(dxLimit*dxLimit + dyLimit*dyLimit);
        
        const maxStep = 0.3 * delta; // Max speed: ~5px per frame at 60fps
        
        if (distToTarget > maxStep && !currentlyRecharging && !isReturningToBase.get() && mode !== "manual" && mode !== "escort") {
            targetX = currentX + (dxLimit/distToTarget) * maxStep;
            targetY = currentY + (dyLimit/distToTarget) * maxStep;
        }

        x.set(targetX);
        y.set(targetY);
        opacity.set(targetOpacity);
        scale.set(targetScale);
    });

    if (dimensions.width === 0) return null;

    return (
        <motion.div
            className="fixed pointer-events-none z-[50]"
            style={{ 
                x: springX, 
                y: springY, 
                rotate: springRotate,
                opacity,
                scale,
                marginLeft: "-1.5rem", // offset center
                marginTop: "-1.5rem"
            }}
        >
            <div className="relative flex items-center justify-center w-12 h-12">
                
                {/* Landing Pad Effect when charging */}
                {chargingState && (
                    <motion.div 
                        className="absolute inset-0 bg-mine/10 rounded-full border border-mine/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                <Plane className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${isLowBattery ? 'text-red-500' : 'text-mine/70'}`} />
                
                {/* Lidar Cone in Scan mode */}
                {mode === "scan" && !chargingState && (
                    <motion.div 
                        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-gradient-to-b from-mine/10 to-transparent origin-top -translate-x-1/2 -z-10"
                        style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {/* Engine Trail */}
                {(mode === "intercept" || mode === "manual" || mode === "escort") && !chargingState && (
                    <motion.div 
                        className="absolute w-2 h-2 rounded-full bg-mine/80 blur-[2px] -z-10"
                        animate={{ scale: [1, 0], opacity: [0.8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                )}

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <span className="text-[8px] font-mono text-mine/90 bg-black/80 px-1.5 py-0.5 border border-mine/30 whitespace-nowrap backdrop-blur-md rounded-sm">
                        {id} {chargingState ? "[CHG]" : ""}
                    </span>
                    <div className="w-8 h-1 bg-black/80 border border-mine/30 rounded-full overflow-hidden">
                        <motion.div 
                            className={`h-full ${isLowBattery ? 'shadow-[0_0_5px_red]' : 'shadow-[0_0_5px_#38ff42]'}`} 
                            style={{ width: batteryWidth, backgroundColor: batteryColor }} 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const DroneOverlay = () => {
    const [mode, setMode] = useState<UAVMode>("patrol");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [manualPos, setManualPos] = useState({ x: 0, y: 0 });
    const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
    
    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleCommand = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.mode) {
                setMode(detail.mode);
                if (detail.mode === "intercept") {
                    // Spawn 3-5 anomalies
                    const newAnomalies = Array.from({ length: 3 + Math.floor(Math.random() * 3) }).map((_, i) => ({
                        id: `ANOMALY_${Date.now()}_${i}`,
                        x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
                        y: Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1,
                    }));
                    setAnomalies(newAnomalies);
                    triggerSystemSignal(`ANOMALIES_DETECTED: ${newAnomalies.length}`, "error");
                }
            }
        };
        window.addEventListener("UAV_COMMAND", handleCommand);
        return () => window.removeEventListener("UAV_COMMAND", handleCommand);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (mode === "escort") {
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        };
        const handleClick = (e: MouseEvent) => {
            if (mode === "manual") {
                setManualPos({ x: e.clientX, y: e.clientY });
                triggerSystemSignal(`WAYPOINT_SET: X${Math.floor(e.clientX)} Y${Math.floor(e.clientY)}`, "info");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, [mode]);

    const handleAnomalyIntercepted = useCallback((id: string) => {
        setAnomalies(prev => {
            const next = prev.filter(a => a.id !== id);
            if (prev.length > 0 && next.length === 0) {
                triggerSystemSignal("ALL_ANOMALIES_NEUTRALIZED", "success");
                setMode("patrol"); // Return to patrol after winning
            }
            return next;
        });
    }, []);

    return (
        <div className={`fixed inset-0 ${mode === "manual" ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"} overflow-hidden z-[50]`}>
            {/* Render Anomalies */}
            {anomalies.map(anomaly => (
                <motion.div
                    key={anomaly.id}
                    className="absolute text-red-500 z-[40]"
                    style={{ left: anomaly.x, top: anomaly.y, x: "-50%", y: "-50%" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <Crosshair className="w-6 h-6 animate-spin-slow opacity-80" />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                </motion.div>
            ))}

            <Drone 
                id="UAV_ALPHA" 
                index={0} 
                mode={mode} 
                dimensions={dimensions} 
                mousePos={mousePos} 
                manualPos={manualPos}
                anomalies={anomalies}
                onAnomalyIntercepted={handleAnomalyIntercepted}
            />
            <Drone 
                id="UAV_BRAVO" 
                index={1} 
                mode={mode} 
                dimensions={dimensions} 
                mousePos={mousePos} 
                manualPos={manualPos}
                anomalies={anomalies}
                onAnomalyIntercepted={handleAnomalyIntercepted}
            />
            <Drone 
                id="UAV_CHARLIE" 
                index={2} 
                mode={mode} 
                dimensions={dimensions} 
                mousePos={mousePos} 
                manualPos={manualPos}
                anomalies={anomalies}
                onAnomalyIntercepted={handleAnomalyIntercepted}
            />

            {/* Global UI Overlays */}
            {mode === "manual" && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 border border-mine/50 px-6 py-3 rounded-full backdrop-blur-md z-[60]">
                    <p className="text-mine font-mono text-sm tracking-widest animate-pulse">MANUAL OVERRIDE: CLICK ANYWHERE TO SET WAYPOINT</p>
                </div>
            )}
            
            {mode === "intercept" && anomalies.length > 0 && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-950/80 border border-red-500/50 px-6 py-3 rounded-xl backdrop-blur-md z-[60]">
                    <p className="text-red-500 font-mono text-sm tracking-widest animate-pulse font-bold">THREATS DETECTED: {anomalies.length} REMAINING</p>
                </div>
            )}
        </div>
    );
};

export const triggerUAVCommand = (mode: UAVMode) => {
    window.dispatchEvent(new CustomEvent("UAV_COMMAND", { detail: { mode } }));
};
