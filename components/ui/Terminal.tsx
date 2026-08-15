"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getResume } from "@/lib/getResume";
import profileData from "@/lib/data.json";
import { triggerSystemSignal } from "@/components/ui/SystemToaster";
import { triggerUAVCommand } from "@/components/ui/DroneOverlay";

interface TerminalProps {
    className?: string;
}

export const Terminal = ({ className }: TerminalProps) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "System initialized.",
        "ACE (Automated Conversational Entity) is online.",
        "Type /help for system commands or ask me a question in plain English."
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, (args?: string[]) => void> = {
        "/help": () => {
            setHistory(prev => [
                ...prev, 
                "> ACE is active. You can chat with me about Rajjit's skills, experience, and projects.",
                "> Protocols: /init, /metrics, /arsenal, /systems, /missions, /chronicles, /feedback, /uplink, /resume, /uav, /sim, /neofetch, /whoami, /clear"
            ]);
            triggerSystemSignal("MANIFEST_FETCHED", "info");
        },
        "/sim": () => {
            window.dispatchEvent(new CustomEvent("UAV_SIM_LAUNCH"));
            setHistory(prev => [...prev, "> Initializing UAV_FIELD_SIMULATION..."]);
            triggerSystemSignal("SIM_ENGAGED", "success");
        },
        "/uav": (args) => {
            const mode = args?.[0]?.toLowerCase();
            if (!mode || !["patrol", "scan", "return", "stealth", "manual", "escort", "intercept"].includes(mode)) {
                setHistory(prev => [
                    ...prev,
                    "> UAV_SUBSYSTEM_ROOT:",
                    "> Protocols: /uav patrol, /uav scan, /uav return, /uav stealth, /uav manual, /uav escort, /uav intercept"
                ]);
                return;
            }
            triggerUAVCommand(mode as "patrol" | "scan" | "return" | "stealth" | "manual" | "escort" | "intercept");
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
        "/systems": () => {
            document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" });
            setHistory(prev => [...prev, "> Accessing Sector: SYSTEMS..."]);
            triggerSystemSignal("SECTOR_TRANSITION: SYSTEMS", "info");
        },
        "/sys": () => commands["/systems"](),
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

    const [isTyping, setIsTyping] = useState(false);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const fullResponseRef = useRef<string>("");

    const stopTypingImmediate = () => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }
        if (fullResponseRef.current) {
            const finalResp = fullResponseRef.current;
            setHistory(prev => {
                const next = [...prev];
                next[next.length - 1] = `> ACE_AI: ${finalResp}`;
                return next;
            });
            fullResponseRef.current = "";
        }
        setIsTyping(false);
    };

    const streamAiResponse = (fullResponse: string) => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }

        setIsTyping(true);
        fullResponseRef.current = fullResponse;

        // Step 1: Thinking / Synthesizing state
        setHistory(prev => [...prev, "> ACE_AI: [Analyzing neural query & knowledge base...]"]);
        triggerSystemSignal("ACE_AI_PROCESSING", "info");

        setTimeout(() => {
            let index = 0;
            const totalChars = fullResponse.length;
            const step = 3; // 3 characters per tick for smooth, snappy typewriter flow

            setHistory(prev => {
                const next = [...prev];
                next[next.length - 1] = "> ACE_AI: ";
                return next;
            });

            typingIntervalRef.current = setInterval(() => {
                index += step;
                const chunk = fullResponse.slice(0, Math.min(index, totalChars));

                setHistory(prev => {
                    const next = [...prev];
                    next[next.length - 1] = `> ACE_AI: ${chunk}`;
                    return next;
                });

                if (index >= totalChars) {
                    if (typingIntervalRef.current) {
                        clearInterval(typingIntervalRef.current);
                        typingIntervalRef.current = null;
                    }
                    fullResponseRef.current = "";
                    setIsTyping(false);
                    triggerSystemSignal("ACE_AI_RESPONSE_COMPLETE", "success");
                }
            }, 14);
        }, 320); // 320ms neural thinking latency
    };

    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };
    }, []);

    const executeCommand = (rawInput: string) => {
        if (isTyping) {
            stopTypingImmediate();
            return;
        }

        const parts = rawInput.trim().split(/\s+/);
        let cmdKey = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Auto-fix missing slash for known commands
        if (!cmdKey.startsWith("/") && commands["/" + cmdKey]) {
            cmdKey = "/" + cmdKey;
        }

        if (!cmdKey) {
            if (rawInput.trim() !== "") {
               setHistory(prev => [...prev, `user@rj-os:~$ ${rawInput}`]);
               streamAiResponse("Please enter a question or execute a system protocol like /help.");
            }
            return;
        }

        setHistory(prev => [...prev, `user@rj-os:~$ ${rawInput}`]);

        if (commands[cmdKey]) {
            commands[cmdKey](args);
        } else {
            // Intelligent fallback: ACE AI Chatbot logic
            const userInput = rawInput.toLowerCase();
            let aiResponse = "";

            if (userInput.includes("skill") || userInput.includes("stack") || userInput.includes("tech") || userInput.includes("know") || userInput.includes("language") || userInput.includes("arsenal")) {
                aiResponse = `Rajjit's technical arsenal includes ${profileData.skills.languages.join(", ")}. Primary frontend: ${profileData.skills.frontend.join(", ")}. Backend: ${profileData.skills.backend.join(", ")}. IoT, Drone & Embedded: ${profileData.skills.iot.join(", ")}. Type /arsenal to see the full interactive skill tree.`;
            } else if (userInput.includes("experience") || userInput.includes("work") || userInput.includes("job") || userInput.includes("role") || userInput.includes("career") || userInput.includes("nielit") || userInput.includes("nibiaa") || userInput.includes("lab") || userInput.includes("drone") || userInput.includes("gcs") || userInput.includes("assistant")) {
                const current = profileData.experience[0];
                const prev = profileData.experience[1];
                aiResponse = `Rajjit is currently working as a ${current.role} at ${current.company} (${current.period}), developing custom Ground Control Station (GCS) software, drone scripting, AI pipelines, and autonomous flight routines. Previously, he was an ${prev.role} at ${prev.company} (${prev.period}) building hybrid LoRaWAN/Satellite tracking platforms. Type /chronicles to inspect the full timeline.`;
            } else if (userInput.includes("project") || userInput.includes("portfolio") || userInput.includes("build") || userInput.includes("made") || userInput.includes("mission") || userInput.includes("nawa") || userInput.includes("uav")) {
                aiResponse = `Rajjit has engineered custom Ground Control Stations (GCS), AI drone survivor detection systems (~80% accuracy over 215+ flights), hybrid LoRaWAN/Satellite tracking networks, and local MCP/Ollama inference pipelines. Type /missions or /systems to explore the live visual demos.`;
            } else if (userInput.includes("education") || userInput.includes("college") || userInput.includes("degree") || userInput.includes("bca") || userInput.includes("study") || userInput.includes("cgpa")) {
                aiResponse = `Rajjit graduated with a Bachelor's in Computer Applications (BCA) from NIELIT Imphal with a 9.3 CGPA, alongside specialized certifications in Cyber Security (NIELIT Imphal) and Computer Applications (AiTC).`;
            } else if (userInput.includes("contact") || userInput.includes("email") || userInput.includes("hire") || userInput.includes("reach") || userInput.includes("message") || userInput.includes("touch") || userInput.includes("link")) {
                aiResponse = `You can establish an uplink with Rajjit via email at ${profileData.contact.email} or connect on LinkedIn: ${profileData.contact.linkedin}. Type /uplink to jump directly to the contact console.`;
            } else if (userInput.includes("who is") || userInput.includes("about") || userInput.includes("bio") || userInput.includes("name") || userInput.includes("who are you") || userInput.includes("rajjit")) {
                aiResponse = `${profileData.basics.name} is a ${profileData.basics.role} based in ${profileData.basics.location}. ${profileData.basics.bio}`;
            } else if (userInput.includes("sim") || userInput.includes("simulator") || userInput.includes("fly") || userInput.includes("game")) {
                aiResponse = `Launching the tactical UAV 3D simulator... You can also control the drones manually using [WASD] and [ARROWS]. Type /sim to re-open the simulator canvas at any time.`;
                window.dispatchEvent(new CustomEvent("UAV_SIM_LAUNCH"));
            } else if (userInput.includes("hi") || userInput.includes("hello") || userInput.includes("hey") || userInput.includes("greetings") || userInput.includes("sup")) {
                aiResponse = `Greetings! I am ACE (Automated Conversational Entity), Rajjit's AI portfolio co-pilot. How can I assist you with his drone software engineering, IoT systems, or project portfolio today?`;
            } else if (userInput.includes("help") || userInput.includes("what can you do")) {
                aiResponse = `I can answer queries about Rajjit's drone stacks, NIELIT lab research, IoT systems, skills, projects, and contact info. You can also run system protocols: /init, /metrics, /arsenal, /systems, /missions, /chronicles, /uav, /sim, /neofetch, /whoami.`;
            } else {
                aiResponse = `Query not recognized in core database. Try asking in plain English about Rajjit's drone stacks, NIELIT research, IoT experience at Nibiaa, or type /help for available protocols.`;
            }

            streamAiResponse(aiResponse);
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

    const SUGGESTIONS = [
        "What drone software did Rajjit build at NIELIT?",
        "What is his core tech stack?",
        "Tell me about his IoT experience at Nibiaa",
        "What are his autonomous drone projects?",
        "How can I contact or hire Rajjit?",
        "Type /sim to launch UAV Simulation"
    ];
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSuggestionIndex(prev => (prev + 1) % SUGGESTIONS.length);
        }, 3600);
        return () => clearInterval(interval);
    }, [SUGGESTIONS.length]);

    useEffect(() => {
        const handleCustomToggle = () => setIsOpen(prev => !prev);
        window.addEventListener("TOGGLE_TERMINAL", handleCustomToggle);
        return () => window.removeEventListener("TOGGLE_TERMINAL", handleCustomToggle);
    }, []);

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
                            className="w-full md:w-[600px] h-[420px] bg-black/85 backdrop-blur-xl border-2 border-mine/40 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_40px_rgba(56,255,66,0.15)]"
                        >
                        {/* Terminal Header */}
                        <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isTyping ? "bg-amber-400 animate-ping" : "bg-mine animate-pulse"}`} />
                                <span className="text-[10px] font-mono text-mine tracking-widest uppercase font-bold">
                                    ACE_AI_TERMINAL // {isTyping ? "NEURAL_GENERATING..." : "SYNAPSE_ONLINE"}
                                </span>
                            </div>
                            <button 
                                onClick={() => {
                                    if (isTyping) stopTypingImmediate();
                                    setIsOpen(false);
                                }} 
                                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-mine/70 hover:text-mine text-[10px] font-mono transition-colors"
                            >
                                EXIT [ESC]
                            </button>
                        </div>

                        {/* history */}
                        <div
                            ref={historyRef}
                            className="flex-1 p-3 font-mono text-[11px] overflow-y-auto scrollbar-hide space-y-1.5 text-zinc-300"
                        >
                            {history.map((line, i) => {
                                const isUser = line.startsWith("user");
                                const isError = line.startsWith("> Error");
                                const isLastLine = i === history.length - 1;

                                // Support subcommands in click (e.g., /uav scan)
                                const parts = line.split(/(\/[a-z]+(?:\s+[a-z]+)?)/g);

                                return (
                                    <div key={i} className={isUser ? "text-hers font-semibold" : isError ? "text-red-400" : ""}>
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
                                        {isTyping && isLastLine && !isUser && (
                                            <span className="inline-block w-2 h-3.5 bg-mine animate-pulse ml-1 align-middle shadow-[0_0_8px_#38ff42]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Prompts Bar */}
                        <div className="px-3 py-1.5 border-t border-white/5 bg-zinc-900/60 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase shrink-0 font-bold">SUGGESTIONS:</span>
                            {[
                                "Experience at NIELIT",
                                "Skills & Stack",
                                "Autonomous Projects",
                                "/sim",
                                "/uav intercept",
                                "/resume",
                                "/help",
                                "/clear"
                            ].map(cmd => (
                                <button
                                    key={cmd}
                                    onClick={() => executeCommand(cmd)}
                                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 hover:bg-mine/20 text-zinc-300 hover:text-mine border border-zinc-700/50 hover:border-mine/40 transition-all pointer-events-auto whitespace-nowrap"
                                    type="button"
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-2.5 bg-zinc-900/80 border-t border-white/10 flex items-center gap-2">
                            <span className="text-mine text-xs font-mono font-bold">~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-xs font-mono text-white w-full placeholder:text-zinc-500"
                                placeholder={isTyping ? "ACE is generating response... [Press ENTER to skip]" : "Ask ACE a question in English or execute a command..."}
                                autoFocus
                            />
                            {isTyping && (
                                <button
                                    type="button"
                                    onClick={stopTypingImmediate}
                                    className="text-[9px] font-mono text-zinc-400 hover:text-mine px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700/60 transition-colors whitespace-nowrap"
                                >
                                    SKIP [↵]
                                </button>
                            )}
                        </form>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-start gap-2">
                        {/* Interactive "Ask Me" Callout Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                setIsOpen(true);
                                const q = SUGGESTIONS[suggestionIndex];
                                setTimeout(() => {
                                    executeCommand(q);
                                }, 150);
                            }}
                            className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 bg-zinc-950/95 backdrop-blur-xl border border-mine/40 rounded-full shadow-[0_0_20px_rgba(56,255,66,0.2)] hover:border-mine hover:shadow-[0_0_30px_rgba(56,255,66,0.35)] transition-all pointer-events-auto"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mine opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-mine"></span>
                            </span>
                            <span className="text-[10px] font-mono font-black text-mine uppercase tracking-wider shrink-0">ASK ME:</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={suggestionIndex}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-white max-w-[200px] sm:max-w-xs truncate"
                                >
                                    &quot;{SUGGESTIONS[suggestionIndex]}&quot;
                                </motion.span>
                            </AnimatePresence>
                            <span className="hidden sm:inline-block text-[8px] bg-mine/15 text-mine px-1.5 py-0.5 rounded border border-mine/30 font-mono font-black">
                                CLICK
                            </span>
                        </motion.div>

                        {/* Standout Terminal Trigger Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsOpen(true)}
                            className="relative group flex items-center gap-3 px-3.5 py-2 bg-zinc-950/90 backdrop-blur-xl border-2 border-mine/50 hover:border-mine rounded-xl text-white shadow-[0_0_25px_rgba(56,255,66,0.2)] hover:shadow-[0_0_35px_rgba(56,255,66,0.35)] transition-all pointer-events-auto"
                        >
                            <div className="w-6 h-6 rounded-lg bg-mine/15 border border-mine/40 flex items-center justify-center text-mine group-hover:bg-mine group-hover:text-black transition-all font-mono font-black text-xs">
                                &gt;_
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-mono font-extrabold text-white group-hover:text-mine transition-colors tracking-wide">
                                        CHAT WITH ACE AI
                                    </span>
                                    <span className="text-[8px] font-mono font-black px-1.5 py-0.2 rounded bg-mine/20 text-mine border border-mine/40">
                                        ONLINE
                                    </span>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-400">
                                    Ask anything about Rajjit&apos;s work [`]
                                </span>
                            </div>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
