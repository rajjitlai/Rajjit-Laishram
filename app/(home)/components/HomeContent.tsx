"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Skills from "./Skills";
import Projects from "./Projects";
import Footer from "./Footer";
import { Stats } from "./Stats";
import { BlogHighlight } from "./BlogHighlight";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Testimonials } from "./Testimonials";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(mod => mod.BackgroundBeams), { ssr: false });
const FloatNav = dynamic(() => import("./FloatNav").then(mod => mod.FloatNav), { ssr: false });
const ViewportHUD = dynamic(() => import("@/components/ui/ViewportHUD").then(mod => mod.ViewportHUD), { ssr: false });
const LogicFlux = dynamic(() => import("@/components/ui/LogicFlux").then(mod => mod.LogicFlux), { ssr: false });
const Terminal = dynamic(() => import("@/components/ui/Terminal").then(mod => mod.Terminal), { ssr: false });
const AtmosphericPulse = dynamic(() => import("@/components/ui/AtmosphericPulse").then(mod => mod.AtmosphericPulse), { ssr: false });
const Loader = dynamic(() => import("@/components/ui/Loader").then(mod => mod.Loader), { ssr: false });
const HUDIndex = dynamic(() => import("@/components/ui/HUDIndex").then(mod => mod.HUDIndex), { ssr: false });
const SystemToaster = dynamic(() => import("@/components/ui/SystemToaster").then(mod => mod.SystemToaster), { ssr: false });
const SystemLog = dynamic(() => import("@/components/ui/SystemLog").then(mod => mod.SystemLog), { ssr: false });
const DroneOverlay = dynamic(() => import("@/components/ui/DroneOverlay").then(mod => mod.DroneOverlay), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop").then(mod => mod.ScrollToTop), { ssr: false });
const UAVSimulation = dynamic(() => import("@/components/ui/UAVSimulation").then(mod => mod.UAVSimulation), { ssr: false });

import { Project } from "@/lib/getProjects";

export default function HomeContent({ initialProjects = [] }: { initialProjects?: Project[] }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSimOpen, setIsSimOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const handleLaunchSim = () => setIsSimOpen(true);
        window.addEventListener("UAV_SIM_LAUNCH", handleLaunchSim);
        return () => window.removeEventListener("UAV_SIM_LAUNCH", handleLaunchSim);
    }, []);

    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            <AnimatePresence>
                {isLoading && (
                    <div className="fixed inset-0 z-[10000]">
                        <Loader onFinished={() => setIsLoading(false)} />
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: (hasMounted && isLoading) ? 0 : 1 }}
                transition={{ duration: 1 }}
                className={(hasMounted && isLoading) ? "h-screen overflow-hidden" : "min-h-screen"}
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

                {/* Global Scanline Effect - Optimized with SVG pattern for lower paint cost */}
                <div
                    className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] will-change-transform transform-gpu"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2h4M2 0v4' stroke='%23fff' fill='none' fill-rule='evenodd' opacity='.5'/%3E%3C/svg%3E")`
                    }}
                />

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
                            <Projects initialProjects={initialProjects} />
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
        </div>
    );
}
