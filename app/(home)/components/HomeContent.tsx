"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export default function HomeContent() {
    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            <BackgroundBeams />
            <FloatNav />
            <div className="max-w-7xl mx-auto p-5 relative z-10">
                <Navbar />
                <Hero />
            </div>
            <div className="max-w-7xl mx-auto p-5 relative z-10">
                <ScrollReveal>
                    <Stats />
                </ScrollReveal>
            </div>
            <div className="max-w-7xl mx-auto p-5 mt-10 relative z-10">
                <ScrollReveal>
                    <Skills />
                </ScrollReveal>
                <ScrollReveal>
                    <Projects />
                </ScrollReveal>
                <ScrollReveal>
                    <BlogHighlight />
                </ScrollReveal>
                <ScrollReveal>
                    <Experience />
                </ScrollReveal>
            </div>
            <div className="max-w-7xl mx-auto p-5 mt-10 relative z-10">
                <ScrollReveal>
                    <Testimonials />
                </ScrollReveal>
                <ScrollReveal>
                    <Contact />
                </ScrollReveal>
            </div>
            <Footer />
        </div>
    );
}
