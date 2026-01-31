"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getResume } from "@/lib/getResume";
import { triggerSystemSignal } from "@/components/ui/SystemToaster";
import { triggerUAVCommand } from "@/components/ui/DroneOverlay";

interface TerminalProps {
    className?: string;
}

export const Terminal = ({ className }: TerminalProps) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>(["System initialized. Type /help for commands."]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, (args?: string[]) => void> = {
        "/help": () => {
            setHistory(prev => [...prev, "> Protocols: /init, /metrics, /arsenal, /missions, /chronicles, /feedback, /uplink, /resume, /uav, /sim, /neofetch, /whoami, /clear"]);
            triggerSystemSignal("MANIFEST_FETCHED", "info");
        },
        "/sim": () => {
            window.dispatchEvent(new CustomEvent("UAV_SIM_LAUNCH"));
            setHistory(prev => [...prev, "> Initializing UAV_FIELD_SIMULATION..."]);
            triggerSystemSignal("SIM_ENGAGED", "success");
        },
        "/uav": (args) => {
            const mode = args?.[0]?.toLowerCase();
            if (!mode || !["patrol", "scan", "return", "stealth"].includes(mode)) {
                setHistory(prev => [
                    ...prev,
                    "> UAV_SUBSYSTEM_ROOT:",
                    "> Protocols: /uav patrol, /uav scan, /uav return, /uav stealth"
                ]);
                return;
            }
            triggerUAVCommand(mode as "patrol" | "scan" | "return" | "stealth");
            setHistory(prev => [...prev, `> UAV_PROTOCOL_SYNC: ${mode.toUpperCase()} // STATUS: OK`]);
            triggerSystemSignal(`UAV_SYNC_${mode.toUpperCase()}`, "info");
        },
        "/drone": (args) => commands["/uav"](args),
        "/neofetch": () => {
            const fetchInfo = [
                "            ",
                "   .---.    USER: rajjit@rj-os",
                "  /     \\   KERNEL: Linux 2.6.10-RAJ-OS",
                "  | (O) |   SHELL: TypeScript/Next.js",
                "  \\     /   UPLINK: Connected (v4/v6)",
                "   '---'    HOST: RJ_IOT_PLATFORM_V2",
                "            UAV_SYNC: ACTIVE",
                "            ",
            ];
            setHistory(prev => [...prev, ...fetchInfo]);
            triggerSystemSignal("FETCH_COMPLETE", "success");
        },
        "/whoami": () => {
            setHistory(prev => [...prev, "> HOST: RAJJIT LAISHRAM // ROLE: SYSTEMS_ARCHITECT // STATUS: ACTIVE"]);
            triggerSystemSignal("IDENTITY_VERIFIED", "info");
        },
        "whoami": (args) => commands["/whoami"](args),
        "neofetch": (args) => commands["/neofetch"](args),
        "uav": (args) => commands["/uav"](args),
        "drone": (args) => commands["/uav"](args),
        "/resume": () => {
            const url = getResume();
            window.open(url, "_blank");
            setHistory(prev => [...prev, "> Downloading resume..."]);
            triggerSystemSignal("ASSET_EXTRACTED: RESUME_V26", "success");
        },
        "/missions": () => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Navigating to Sector: MISSIONS..."]);
            triggerSystemSignal("SECTOR_TRANSITION: MISSIONS", "info");
        },
        "/work": () => commands["/missions"](),
        "/arsenal": () => {
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Accessing Technical ARSENAL..."]);
            triggerSystemSignal("SECTOR_TRANSITION: ARSENAL", "info");
        },
        "/skills": () => commands["/arsenal"](),
        "/chronicles": () => {
            document.getElementById("exp")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Accessing Timeline: CHRONICLES..."]);
            triggerSystemSignal("SECTOR_TRANSITION: CHRONICLES", "info");
        },
        "/metrics": () => {
            document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Analyzing Sector: METRICS..."]);
            triggerSystemSignal("SECTOR_TRANSITION: METRICS", "info");
        },
        "/feedback": () => {
            document.getElementById("review")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Accessing Sector: FEEDBACK..."]);
            triggerSystemSignal("SECTOR_TRANSITION: FEEDBACK", "info");
        },
        "/uplink": () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Opening Communication Channel: UPLINK..."]);
            triggerSystemSignal("UPLINK_ESTABLISHED: COMMS", "info");
        },
        "/contact": () => commands["/uplink"](),
        "/init": () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setHistory(prev => [...prev, "> Returning to Sector: INIT..."]);
            triggerSystemSignal("SECTOR_TRANSITION: INIT", "info");
        },
        "/home": () => commands["/init"](),
        "/clear": () => {
            setHistory(["> Terminal cleared."]);
            triggerSystemSignal("BUFFER_CLEARED", "info");
        },
    };

    const executeCommand = (rawInput: string) => {
        const parts = rawInput.trim().split(/\s+/);
        let cmdKey = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Auto-fix missing slash for known commands
        if (!cmdKey.startsWith("/") && commands["/" + cmdKey]) {
            cmdKey = "/" + cmdKey;
        }

        if (!cmdKey) return;

        setHistory(prev => [...prev, `user@rj-os:~$ ${rawInput}`]);

        if (commands[cmdKey]) {
            commands[cmdKey](args);
        } else {
            setHistory(prev => [...prev, `> Error: Command '${cmdKey}' not found.`]);
            triggerSystemSignal(`INVALID_COMMAND: ${cmdKey}`, "error");
        }
        setInput("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
    };

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    // Handle terminal toggle shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Support ` (backtick) or Ctrl+K
            if (e.key === "`" || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

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
                            <span className="text-[10px] font-mono text-mine/60 tracking-widest uppercase flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-mine animate-pulse" />
                                RJ_SYSTEM_CLI_V2.6
                            </span>
                            <button onClick={() => setIsOpen(false)} className="px-2 py-1 text-mine/40 hover:text-mine transition-colors">
                                <span className="text-[10px]">EXIT [ESC]</span>
                            </button>
                        </div>

                        {/* history */}
                        <div
                            ref={historyRef}
                            className="flex-1 p-3 font-mono text-[10px] overflow-y-auto scrollbar-hide space-y-1 text-zinc-400"
                        >
                            {history.map((line, i) => {
                                const isUser = line.startsWith("user");
                                const isError = line.startsWith("> Error");

                                // Support subcommands in click (e.g., /uav scan)
                                const parts = line.split(/(\/[a-z]+(?:\s+[a-z]+)?)/g);

                                return (
                                    <div key={i} className={isUser ? "text-hers" : isError ? "text-red-500" : ""}>
                                        {parts.map((part, index) => {
                                            const lookupKey = part.toLowerCase();
                                            const isCommand = part.startsWith("/") && (commands[lookupKey] || commands[lookupKey.split(" ")[0]]);

                                            if (isCommand) {
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => executeCommand(part)}
                                                        className="text-mine hover:text-white hover:underline cursor-pointer font-bold mx-0.5 transition-colors pointer-events-auto"
                                                        type="button"
                                                    >
                                                        {part}
                                                    </button>
                                                );
                                            }
                                            return <span key={index}>{part}</span>;
                                        })}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="px-3 py-1 border-t border-white/5 bg-zinc-900/40 flex gap-2 overflow-x-auto scrollbar-hide">
                            {["/help", "/uav scan", "/sim", "/neofetch", "/resume", "/clear"].map(cmd => (
                                <button
                                    key={cmd}
                                    onClick={() => executeCommand(cmd)}
                                    className="text-[8px] font-black text-mine/30 hover:text-mine transition-colors uppercase pointer-events-auto whitespace-nowrap"
                                    type="button"
                                >
                                    [{cmd.replace("/", "")}]
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-2 bg-zinc-900/50 border-t border-white/10 flex items-center gap-2">
                            <span className="text-mine text-[10px] font-mono">~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-[10px] font-mono text-white w-full placeholder:text-zinc-700"
                                placeholder="Execute sequence..."
                                autoFocus
                            />
                        </form>
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-mine/30 rounded-lg text-mine/60 text-[10px] font-mono tracking-widest flex items-center gap-2 hover:border-mine hover:text-mine transition-all shadow-lg group"
                    >
                        <div className="w-2 h-2 rounded-sm border border-mine/50 group-hover:bg-mine group-hover:rotate-45 transition-all" />
                        ACCESS_OS_COMMANDS [`]
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
