"use client"

import { useState, useEffect } from 'react'

interface NodeData {
    id: string;
    name: string;
    status: 'ONLINE' | 'OFFLINE' | 'ALERT';
    type: 'LoRaWAN' | 'Satellite' | 'Mesh';
    battery: number;
    signal: number;
    metrics: {
        temp: number;
        humidity: number;
        vibration: number;
    };
}

export function IoTTelemetry() {
    const [nodes, setNodes] = useState<NodeData[]>([
        {
            id: "node-01",
            name: "GATEWAY_ALPHA",
            status: "ONLINE",
            type: "LoRaWAN",
            battery: 94,
            signal: -85,
            metrics: { temp: 23.4, humidity: 58.2, vibration: 0.02 }
        },
        {
            id: "node-02",
            name: "ASSET_TRACKER_07",
            status: "ONLINE",
            type: "Satellite",
            battery: 78,
            signal: -112,
            metrics: { temp: 18.9, humidity: 42.1, vibration: 1.45 }
        },
        {
            id: "node-03",
            name: "MESH_NODE_12",
            status: "ALERT",
            type: "Mesh",
            battery: 12,
            signal: -98,
            metrics: { temp: 42.5, humidity: 88.0, vibration: 0.12 }
        }
    ]);

    const [logs, setLogs] = useState<string[]>([
        "[09:41:02] gateway_alpha: joined LoRaWAN network",
        "[09:41:05] asset_tracker_07: GPS lock acquired, transmitting telemetry",
        "[09:41:12] mesh_node_12: high vibration warning triggered"
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update node metrics randomly to show real-time changes
            setNodes(prev => prev.map(node => {
                if (node.status === 'OFFLINE') return node;
                const isAlert = node.id === 'node-03' || Math.random() > 0.95;
                return {
                    ...node,
                    status: isAlert ? 'ALERT' : 'ONLINE',
                    signal: Math.max(-120, Math.min(-60, node.signal + Math.floor(Math.random() * 5) - 2)),
                    battery: Math.max(0, node.battery - (Math.random() > 0.8 ? 1 : 0)),
                    metrics: {
                        temp: parseFloat((node.metrics.temp + (Math.random() * 0.4 - 0.2)).toFixed(1)),
                        humidity: parseFloat((node.metrics.humidity + (Math.random() * 1 - 0.5)).toFixed(1)),
                        vibration: parseFloat(Math.max(0, node.metrics.vibration + (Math.random() * 0.2 - 0.1)).toFixed(2))
                    }
                };
            }));

            // Add simulated system logs
            const events = [
                "telemetry packet received via LoRaWAN",
                "satellite uplink status: OPTIMAL",
                "Ollama offline inference: Geofence checked",
                "mesh routing updated, path: 12 -> 01",
                "battery low warning on node-03",
                "AI core: survivor detection frame processed"
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            const timeString = new Date().toTimeString().split(' ')[0];
            setLogs(prev => [
                `[${timeString}] ${randomEvent}`,
                ...prev.slice(0, 4)
            ]);

        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/40 relative z-10 text-xs font-mono select-none">
            {/* Header */}
            <div className="flex justify-between items-center bg-zinc-950/60 p-3 border-b border-zinc-800 text-[10px] font-bold tracking-widest text-hers">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-hers rounded-full animate-pulse"></span>
                    LIVE IoT TELEMETRY FEED
                </div>
                <div className="text-zinc-600">SYS_SEC_02 // ACTIVE</div>
            </div>

            {/* Content Area */}
            <div className="p-3 space-y-3">
                {/* Node Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {nodes.map(node => (
                        <div 
                            key={node.id} 
                            className={`p-2.5 rounded-xl border bg-zinc-900/40 flex flex-col justify-between transition-all duration-300 ${
                                node.status === 'ALERT' 
                                    ? 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]' 
                                    : 'border-zinc-800/80'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="font-bold text-zinc-300 truncate max-w-[80%]">{node.name}</span>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    node.status === 'ALERT' ? 'bg-red-500 animate-pulse' : 'bg-hers animate-pulse'
                                }`}></span>
                            </div>
                            
                            <div className="space-y-1 text-[10px] text-zinc-500">
                                <div className="flex justify-between">
                                    <span>TYPE:</span>
                                    <span className="text-zinc-400 font-bold">{node.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>BATTERY:</span>
                                    <span className={node.battery < 20 ? 'text-red-400 font-bold' : 'text-zinc-400 font-bold'}>
                                        {node.battery}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>SIGNAL:</span>
                                    <span className="text-zinc-400 font-bold">{node.signal} dBm</span>
                                </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-zinc-800/80 grid grid-cols-3 text-[9px] text-center gap-1">
                                <div>
                                    <div className="text-zinc-600">T</div>
                                    <div className="text-zinc-300 font-bold">{node.metrics.temp}°</div>
                                </div>
                                <div>
                                    <div className="text-zinc-600">H</div>
                                    <div className="text-zinc-300 font-bold">{node.metrics.humidity}%</div>
                                </div>
                                <div>
                                    <div className="text-zinc-600">V</div>
                                    <div className="text-zinc-300 font-bold">{node.metrics.vibration}g</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Console Log Area */}
                <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-xl p-2.5 h-[76px] overflow-hidden flex flex-col justify-end">
                    <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1 font-bold border-b border-zinc-900 pb-1">
                        System Feed Logs
                    </div>
                    <div className="space-y-0.5 overflow-hidden flex flex-col-reverse">
                        {logs.map((log, i) => (
                            <div 
                                key={i} 
                                className={`text-[10px] leading-relaxed truncate ${
                                    log.includes('warning') || log.includes('low') 
                                        ? 'text-red-400 font-bold' 
                                        : 'text-zinc-500'
                                }`}
                            >
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
