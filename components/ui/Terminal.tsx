"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getResume } from "@/lib/getResume";
import { triggerSystemSignal } from "@/components/ui/SystemToaster";

interface TerminalProps {
    className?: string;
}

export const Terminal = ({ className }: TerminalProps) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>(["System initialized. Type /help for commands."]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, () => void> = {
        "/help": () => {
            setHistory(prev => [...prev, "> Available: /resume, /work, /skills, /contact, /home, /clear"]);
            triggerSystemSignal("MANIFEST_FETCHED", "info");
        },
        "/resume": () => {
            const url = getResume();
            window.open(url, "_blank");
            setHistory(prev => [...prev, "> Downloading resume..."]);
            triggerSystemSignal("ASSET_EXTRACTED: RESUME_V26", "success");
        },
        "/work": () => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Navigating to Projects..."]);
            triggerSystemSignal("SECTOR_TRANSITION: MISSIONS", "info");
        },
        "/skills": () => {
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Accessing Technical Arsenal..."]);
            triggerSystemSignal("SECTOR_TRANSITION: ARSENAL", "info");
        },
        "/contact": () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Opening Communication Channel..."]);
            triggerSystemSignal("UPLINK_ESTABLISHED: COMMS", "info");
        },
        "/home": () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setHistory(prev => [...prev, "> Returning to Root..."]);
            triggerSystemSignal("SECTOR_TRANSITION: INIT", "info");
        },
        "/clear": () => {
            setHistory(["> Terminal cleared."]);
            triggerSystemSignal("BUFFER_CLEARED", "info");
        },
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (cmd) {
            setHistory(prev => [...prev, `user@rj-os:~$ ${cmd}`]);
            if (commands[cmd]) {
                commands[cmd]();
            } else {
                setHistory(prev => [...prev, `> Error: Command '${cmd}' not found.`]);
                triggerSystemSignal(`INVALID_COMMAND: ${cmd}`, "error");
            }
        }
        setInput("");
    };

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    // Handle 'O' key to toggle terminal
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "o" && e.ctrlKey) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto z-[1001] pointer-events-auto ${className}`}>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full md:w-80 h-48 bg-black/80 backdrop-blur-xl border border-mine/30 rounded-xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(56,255,66,0.1)]"
                    >
                        {/* Terminal Header */}
                        <div className="px-3 py-1.5 bg-zinc-900/80 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-mine/60 tracking-widest uppercase">RJ_SYSTEM_CLI</span>
                            <button onClick={() => setIsOpen(false)} className="px-2 py-1 text-mine/40 hover:text-mine transition-colors">
                                <span className="text-[10px]">CLOSE [×]</span>
                            </button>
                        </div>

                        {/* history */}
                        <div
                            ref={historyRef}
                            className="flex-1 p-3 font-mono text-[10px] overflow-y-auto scrollbar-hide space-y-1 text-zinc-400"
                        >
                            {history.map((line, i) => (
                                <div key={i} className={line.startsWith("user") ? "text-hers" : line.startsWith("> Error") ? "text-red-500" : ""}>
                                    {line}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-2 bg-zinc-900/50 border-t border-white/5 flex items-center gap-2">
                            <span className="text-mine text-[10px] font-mono">~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-[10px] font-mono text-white w-full placeholder:text-zinc-700"
                                placeholder="Enter command..."
                                autoFocus
                            />
                        </form>
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-mine/30 rounded-lg text-mine/60 text-[10px] font-mono tracking-widest flex items-center gap-2 hover:border-mine hover:text-mine transition-all shadow-lg"
                    >
                        <span className="w-2 h-2 rounded-full bg-mine animate-pulse" />
                        ACCESS_CLI [CTRL+O]
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
