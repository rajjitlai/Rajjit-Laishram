"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";
import { addMessage } from "@/lib/addMessage";
import { IconCopy, IconMail, IconSend } from "@tabler/icons-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("rajjitlai@mail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addMessage({ firstname, lastname, email, message });
            alert("Message sent successfully!");
            setFirstname("");
            setLastname("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-20 p-5 sm:p-0 font-outfit mt-20 relative overflow-hidden" id="contact">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mine/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hers/5 blur-[120px] rounded-full -z-10" />

            <Title text="Uplink" className="flex flex-col items-center justify-center cursor-pointer mb-20" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                {/* Left Side: Info */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white">Let&apos;s build something <span className="text-mine">great.</span></h3>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Have a project in mind? Whether it&apos;s a complex IoT integration or a high-performance web app, I&apos;m here to help bring your ideas to life.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={handleCopyEmail}>
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-mine transition-colors">
                                <IconMail className="w-6 h-6 text-zinc-400 group-hover:text-mine transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Email Me</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-medium">rajjitlai@mail.com</p>
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="text-[10px] bg-mine/20 text-mine px-2 py-0.5 rounded-full"
                                            >
                                                Copied!
                                            </motion.span>
                                        ) : (
                                            <IconCopy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 w-full">
                    <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                        {/* Interactive border glow */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mine/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <LabelInputContainer>
                                    <Label htmlFor="firstname" className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">First Name</Label>
                                    <Input
                                        id="firstname"
                                        disabled={isSubmitting}
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        placeholder="Tomba"
                                        className="bg-black/50 border-zinc-800 focus:border-mine transition-colors h-12"
                                        required
                                    />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor="lastname" className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Last Name</Label>
                                    <Input
                                        id="lastname"
                                        disabled={isSubmitting}
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Laishram"
                                        className="bg-black/50 border-zinc-800 focus:border-mine transition-colors h-12"
                                        required
                                    />
                                </LabelInputContainer>
                            </div>

                            <LabelInputContainer>
                                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Email Address</Label>
                                <Input
                                    id="email"
                                    disabled={isSubmitting}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your-email@gmail.com"
                                    type="email"
                                    className="bg-black/50 border-zinc-800 focus:border-mine transition-colors h-12"
                                    required
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Your Message</Label>
                                <textarea
                                    id="message"
                                    disabled={isSubmitting}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell me about your project or idea..."
                                    rows={4}
                                    className="bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-mine focus:border-mine transition-all resize-none text-sm text-white"
                                    required
                                />
                            </LabelInputContainer>

                            <MagneticButton className="w-full">
                                <button
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300",
                                        isSubmitting
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                            : "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"
                                    )}
                                    type="submit"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <IconSend className="w-5 h-5" />}
                                    <BottomGradient />
                                </button>
                            </MagneticButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-mine/50 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-hers/50 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col w-full", className)}>
        {children}
    </div>
);
