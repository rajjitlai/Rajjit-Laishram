"use client"

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import { BackgroundBeams } from "@/components/ui/background-beams";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Testimonials } from "./components/Testimonials";
import { FloatNav } from "./components/FloatNav";

export default function page() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <FloatNav />
      <div className="max-w-7xl mx-auto p-5">
        <BackgroundBeams />
        <Navbar />
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto p-5 mt-20">
        <Skills />
        <Projects />
        <Experience />
      </div>
      <div className="max-w-7xl mx-auto p-5 mt-10">
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}