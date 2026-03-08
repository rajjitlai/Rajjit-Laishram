"use client";
import { config } from "@/config/appwrite";
import { useEffect, useState } from "react";

import { Stats } from "@/app/(home)/components/Stats";
import { BlogHighlight } from "@/app/(home)/components/BlogHighlight";
import { Experience } from "@/app/(home)/components/Experience";
import { Testimonials } from "@/app/(home)/components/Testimonials";

import Hero from "@/app/(home)/components/Hero";
import Navbar from "@/app/(home)/components/Navbar";
import Skills from "@/app/(home)/components/Skills";
import Projects from "@/app/(home)/components/Projects";
import Footer from "@/app/(home)/components/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import dynamic from "next/dynamic";

const FloatNav = dynamic(() => import("@/app/(home)/components/FloatNav").then(mod => mod.FloatNav), { ssr: false });
const Terminal = dynamic(() => import("@/components/ui/Terminal").then(mod => mod.Terminal), { ssr: false });
const Loader = dynamic(() => import("@/components/ui/Loader").then(mod => mod.Loader), { ssr: false });
const SystemToaster = dynamic(() => import("@/components/ui/SystemToaster").then(mod => mod.SystemToaster), { ssr: false });
const SystemLog = dynamic(() => import("@/components/ui/SystemLog").then(mod => mod.SystemLog), { ssr: false });
const DroneOverlay = dynamic(() => import("@/components/ui/DroneOverlay").then(mod => mod.DroneOverlay), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop").then(mod => mod.ScrollToTop), { ssr: false });
const UAVSimulation = dynamic(() => import("@/components/ui/UAVSimulation").then(mod => mod.UAVSimulation), { ssr: false });
const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(mod => mod.BackgroundBeams), { ssr: false });
const AtmosphericPulse = dynamic(() => import("@/components/ui/AtmosphericPulse").then(mod => mod.AtmosphericPulse), { ssr: false });
const LogicFlux = dynamic(() => import("@/components/ui/LogicFlux").then(mod => mod.LogicFlux), { ssr: false });
const ViewportHUD = dynamic(() => import("@/components/ui/ViewportHUD").then(mod => mod.ViewportHUD), { ssr: false });
const HUDIndex = dynamic(() => import("@/components/ui/HUDIndex").then(mod => mod.HUDIndex), { ssr: false });

export default function DebugPage() {
    const [env, setEnv] = useState<any>({});
    const [testComponents, setTestComponents] = useState(false);

    useEffect(() => {
        setEnv({
            NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
            NEXT_PUBLIC_APPWRITE_ID: process.env.NEXT_PUBLIC_APPWRITE_ID,
            NEXT_PUBLIC_APPWRITE_DB: process.env.NEXT_PUBLIC_APPWRITE_DB,
            NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTIONS: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTIONS,
            config_databaseId: config.databaseId,
            config_projectId: config.projectId,
        });
    }, []);

    return (
        <div className="p-10 font-mono text-xs text-green-500 bg-black min-h-screen">
            <h1 className="text-xl mb-4 text-white">SYSTEM_DEBUG_MODE</h1>
            <button 
                onClick={() => setTestComponents(!testComponents)}
                className="mb-10 px-4 py-2 bg-white text-black font-bold"
            >
                {testComponents ? "HIDE_COMPONENTS" : "TEST_COMPONENTS"}
            </button>
            <div className="space-y-2">
                {Object.entries(env).map(([key, value]) => (
                    <div key={key} className="flex gap-4">
                        <span className="text-zinc-500">{key}:</span>
                        <span>{value ? (value as string) : "UNDEFINED"}</span>
                    </div>
                ))}
            </div>

            {testComponents && (
                <div className="mt-20 border-t border-white/10 pt-10">
                    <h2 className="text-lg mb-10 text-white">COMPONENT_REALTIME_TEST</h2>
                    <div className="space-y-20">
                        <section>
                            <h3 className="text-mine mb-4">NAVBAR_NODE</h3>
                            <Navbar />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">HERO_NODE</h3>
                            <Hero />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">STATS_NODE (with ScrollReveal)</h3>
                            <ScrollReveal>
                                <Stats />
                            </ScrollReveal>
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">SKILLS_NODE</h3>
                            <Skills />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">PROJECTS_NODE</h3>
                            <Projects />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">BLOG_HIGHLIGHT_NODE</h3>
                            <BlogHighlight />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">EXPERIENCE_NODE</h3>
                            <Experience />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">TESTIMONIALS_NODE</h3>
                            <Testimonials />
                        </section>
                        <section>
                            <h3 className="text-zinc-500 mb-4">FOOTER_NODE</h3>
                            <Footer />
                        </section>
                        <hr className="border-white/10" />
                        <h2 className="text-lg mb-10 text-white">DYNAMIC_COMPONENT_TEST</h2>
                        <section>
                            <h3 className="text-mine mb-4">TERMINAL_NODE</h3>
                            <Terminal />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">LOADER_NODE (will finish and hide)</h3>
                            <Loader onFinished={() => console.log("Loader finished")} />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">SYSTEM_TOASTER_NODE</h3>
                            <SystemToaster />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">SYSTEM_LOG_NODE</h3>
                            <SystemLog />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">DRONE_OVERLAY_NODE</h3>
                            <DroneOverlay />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">SCROLL_TO_TOP_NODE</h3>
                            <ScrollToTop />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">BACKGROUND_BEAMS_NODE</h3>
                            <BackgroundBeams />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">ATMOSPHERIC_PULSE_NODE</h3>
                            <AtmosphericPulse />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">LOGIC_FLUX_NODE</h3>
                            <LogicFlux />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">VIEWPORT_HUD_NODE</h3>
                            <ViewportHUD />
                        </section>
                        <section>
                            <h3 className="text-mine mb-4">HUD_INDEX_NODE</h3>
                            <HUDIndex />
                        </section>
                        <section>
                            <h3 className="text-zinc-500 mb-4">FOOTER_NODE</h3>
                            <Footer />
                        </section>
                        <section>
                            <h3 className="text-hers mb-4">FLOAT_NAV_NODE</h3>
                            <FloatNav />
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
