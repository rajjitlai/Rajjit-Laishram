"use client"

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";

const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(mod => mod.BackgroundBeams), { ssr: false });
const Skills = dynamic(() => import("./components/Skills"));
const Projects = dynamic(() => import("./components/Projects"));
const Footer = dynamic(() => import("./components/Footer"));
const Contact = dynamic(() => import("./components/Contact").then(mod => mod.Contact));
const Experience = dynamic(() => import("./components/Experience").then(mod => mod.Experience));
const Testimonials = dynamic(() => import("./components/Testimonials").then(mod => mod.Testimonials));
const FloatNav = dynamic(() => import("./components/FloatNav").then(mod => mod.FloatNav), { ssr: false });

export default function page() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <BackgroundBeams />
      <FloatNav />
      <div className="max-w-7xl mx-auto p-5 relative z-10">
        <Navbar />
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto p-5 mt-20 relative z-10">
        <Skills />
        <Projects />
        <Experience />
      </div>
      <div className="max-w-7xl mx-auto p-5 mt-10 relative z-10">
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}