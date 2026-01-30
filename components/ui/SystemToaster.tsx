"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "info" | "success" | "warning" | "error";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export const SystemToaster = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    useEffect(() => {
        const handleSystemSignal = (e: Event) => {
            const customEvent = e as CustomEvent<{ message: string; type: ToastType }>;
            if (customEvent.detail) {
                addToast(customEvent.detail.message, customEvent.detail.type);
            }
        };

        window.addEventListener("system-signal", handleSystemSignal);
        return () => window.removeEventListener("system-signal", handleSystemSignal);
    }, [addToast]);

    return (
        <div className="fixed bottom-24 right-8 z-[1000] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className={`px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded overflow-hidden flex flex-col min-w-[200px] shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${toast.type === "success" ? "bg-mine shadow-[0_0_8px_#38ff42]" :
                                toast.type === "error" ? "bg-red-500 shadow-[0_0_8px_#ef4444]" :
                                    toast.type === "warning" ? "bg-yellow-500 shadow-[0_0_8px_#f59e0b]" :
                                        "bg-hers shadow-[0_0_8px_#55eefd]"
                                }`} />
                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">
                                system_uplink // {toast.type}
                            </span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-200">
                            {toast.message}
                        </p>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className={`h-[1px] mt-2 ${toast.type === "success" ? "bg-mine" :
                                toast.type === "error" ? "bg-red-500" :
                                    toast.type === "warning" ? "bg-yellow-500" :
                                        "bg-hers"
                                }`}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// Helper function to trigger toasts
export const triggerSystemSignal = (message: string, type: ToastType = "info") => {
    window.dispatchEvent(new CustomEvent("system-signal", { detail: { message, type } }));
};
