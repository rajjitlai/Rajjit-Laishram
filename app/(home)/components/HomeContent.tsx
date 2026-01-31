"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LogicFlux } from "@/components/ui/LogicFlux";

const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(mod => mod.BackgroundBeams), { ssr: false });
const Skills = dynamic(() => import("./Skills"));
const Projects = dynamic(() => import("./Projects"));
const BlogHighlight = dynamic(() => import("./BlogHighlight").then(mod => mod.BlogHighlight));
const Footer = dynamic(() => import("./Footer"));
const Contact = dynamic(() => import("./Contact").then(mod => mod.Contact));
const Experience = dynamic(() => import("./Experience").then(mod => mod.Experience));
const Testimonials = dynamic(() => import("./Testimonials").then(mod => mod.Testimonials));
const FloatNav = dynamic(() => import("./FloatNav").then(mod => mod.FloatNav), { ssr: false });
const Stats = dynamic(() => import("./Stats").then(mod => mod.Stats));
const ViewportHUD = dynamic(() => import("@/components/ui/ViewportHUD").then(mod => mod.ViewportHUD), { ssr: false });
const Terminal = dynamic(() => import("@/components/ui/Terminal").then(mod => mod.Terminal), { ssr: false });
const AtmosphericPulse = dynamic(() => import("@/components/ui/AtmosphericPulse").then(mod => mod.AtmosphericPulse), { ssr: false });
const Loader = dynamic(() => import("@/components/ui/Loader").then(mod => mod.Loader), { ssr: false });
const HUDIndex = dynamic(() => import("@/components/ui/HUDIndex").then(mod => mod.HUDIndex), { ssr: false });
const SystemToaster = dynamic(() => import("@/components/ui/SystemToaster").then(mod => mod.SystemToaster), { ssr: false });
const SystemLog = dynamic(() => import("@/components/ui/SystemLog").then(mod => mod.SystemLog), { ssr: false });
const DroneOverlay = dynamic(() => import("@/components/ui/DroneOverlay").then(mod => mod.DroneOverlay), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop").then(mod => mod.ScrollToTop), { ssr: false });
const UAVSimulation = dynamic(() => import("@/components/ui/UAVSimulation").then(mod => mod.UAVSimulation), { ssr: false });

export default function HomeContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSimOpen, setIsSimOpen] = useState(false);

    useEffect(() => {
        const handleLaunchSim = () => setIsSimOpen(true);
        window.addEventListener("UAV_SIM_LAUNCH", handleLaunchSim);
        return () => window.removeEventListener("UAV_SIM_LAUNCH", handleLaunchSim);
    }, []);

    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <Loader key="loader" onFinished={() => setIsLoading(false)} />
                ) : (
                    <motion.div
                        key="main-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <BackgroundBeams />
                        <AtmosphericPulse />
                        <LogicFlux />
                        <ViewportHUD />
                        <HUDIndex />
                        <SystemToaster />
                        <Terminal />
                        <DroneOverlay />
                        <ScrollToTop />
                        <UAVSimulation isOpen={isSimOpen} onClose={() => setIsSimOpen(false)} />

                        {/* Global Scanline Effect */}
                        <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

                        <FloatNav />

                        <div className="max-w-7xl mx-auto p-5 relative z-10">
                            <Navbar />
                            <div id="hero">
                                <Hero />
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto p-5 relative z-10" id="stats">
                            <ScrollReveal>
                                <Stats />
                            </ScrollReveal>
                        </div>

                        <div className="max-w-7xl mx-auto p-5 mt-10 relative z-10">
                            <ScrollReveal>
                                <div id="skills">
                                    <Skills />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal>
                                <div id="projects">
                                    <Projects />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal>
                                <BlogHighlight />
                            </ScrollReveal>
                            <ScrollReveal>
                                <div id="exp">
                                    <Experience />
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="max-w-7xl mx-auto p-5 mt-10 relative z-10">
                            <div id="review">
                                <ScrollReveal>
                                    <Testimonials />
                                </ScrollReveal>
                            </div>
                            <div id="contact">
                                <ScrollReveal>
                                    <Contact />
                                </ScrollReveal>
                            </div>
                        </div>
                        <Footer />
                        <div className="fixed bottom-0 left-0 right-0 z-[1002]">
                            <SystemLog />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
