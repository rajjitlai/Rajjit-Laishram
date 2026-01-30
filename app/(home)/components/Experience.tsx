"use client"
import React from "react";
import Title from "@/components/Title";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
    const data = [
        {
            title: "2025",
            content: (
                <div className="space-y-8">
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-mine">IoT Software Developer</h4>
                            <span className="text-sm text-neutral-500 font-mono">July 2025 - Present</span>
                        </div>
                        <p className="text-neutral-400 font-semibold mb-3">Nibiaa • Imphal, Manipur</p>
                        <ul className="space-y-2 list-none">
                            {[
                                "Developing enterprise IoT solutions focusing on smart warehouse management systems.",
                                "Implementing real-time monitoring and automation for large-scale inventory tracking.",
                                "Architecting end-to-end systems with cloud connectivity using MQTT and HTTP protocols.",
                                "Integrating diverse industrial sensors for precise data collection and edge processing."
                            ].map((bullet, i) => (
                                <li key={i} className="flex gap-2 text-neutral-300 text-sm leading-relaxed">
                                    <span className="text-mine mt-1.5 h-1.5 w-1.5 rounded-full bg-mine shrink-0" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-zinc-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-hers">Lead Software Engineer</h4>
                            <span className="text-sm text-neutral-500 font-mono">Mar 2025 - Jan 2026</span>
                        </div>
                        <p className="text-neutral-400 font-semibold mb-3">Nongin Aerial Wings Aid (NAWA) • NIDAR Drone Competition</p>
                        <ul className="space-y-2 list-none">
                            {[
                                "Spearheaded autonomous drone mission systems as Team Captain.",
                                "Architected custom GCS with a robust backend, database, and real-time APIs.",
                                "Implemented path-planning and survivor detection using OpenCV and DroneKit.",
                                "Engineered custom reliability logic including multi-GPS confirmation systems.",
                                "Orchestrated two-drone autonomous coordination for scout and delivery operations."
                            ].map((bullet, i) => (
                                <li key={i} className="flex gap-2 text-neutral-300 text-sm leading-relaxed">
                                    <span className="text-hers mt-1.5 h-1.5 w-1.5 rounded-full bg-hers shrink-0" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-zinc-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-mine">Autonomous Systems Developer</h4>
                            <span className="text-sm text-neutral-500 font-mono">Feb 2025 - Jan 2026</span>
                        </div>
                        <p className="text-neutral-400 font-semibold mb-3">NIELIT Imphal (Drone Lab)</p>
                        <ul className="space-y-2 list-none">
                            {[
                                "Crafting high-performance mobile apps with React Native & Expo for hardware control.",
                                "Optimizing server-side Python scripts for low-latency drone communication.",
                                "Collaborating on mission control algorithms for complex autonomous flight paths."
                            ].map((bullet, i) => (
                                <li key={i} className="flex gap-2 text-neutral-300 text-sm leading-relaxed">
                                    <span className="text-mine mt-1.5 h-1.5 w-1.5 rounded-full bg-mine shrink-0" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div className="space-y-8">
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-hers">Head Developer</h4>
                            <span className="text-sm text-neutral-500 font-mono">Oct 2024 - Nov 2024</span>
                        </div>
                        <p className="text-neutral-400 font-semibold mb-3">Cybrella • NIELIT Imphal</p>
                        <ul className="space-y-2 list-none text-neutral-300 text-sm leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-hers mt-1.5 h-1.5 w-1.5 rounded-full bg-hers shrink-0" />
                                Led development of full-stack web solutions integrating creative design with robust security.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-hers mt-1.5 h-1.5 w-1.5 rounded-full bg-hers shrink-0" />
                                Mentored a cohort of junior developers in modern CI/CD practices and code quality.
                            </li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-zinc-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-mine">Full-Stack Developer (Freelance)</h4>
                            <span className="text-sm text-neutral-500 font-mono">2021 - 2025</span>
                        </div>
                        <p className="text-neutral-400 font-semibold mb-3">Independent Journey</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { name: "TreatPath Global", desc: "Healthcare platform" },
                                { name: "SoundiBeat", desc: "Music distribution" },
                                { name: "Cyano Bact", desc: "VS Code Theme" }
                            ].map((proj, i) => (
                                <div key={i} className="bg-zinc-800/30 p-4 border border-zinc-700/50 rounded-xl">
                                    <p className="text-mine text-sm font-bold mb-1">{proj.name}</p>
                                    <p className="text-neutral-500 text-xs">{proj.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-neutral-600 bg-zinc-900/50 p-2 rounded italic border border-zinc-800/50">
                            * Certification: Cyber Security (NIELIT Imphal, 2024)
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div className="space-y-4">
                    <p className="text-neutral-400 font-semibold">Product Launch & Open Source</p>
                    <div className="bg-gradient-to-br from-mine/10 to-transparent p-6 border border-mine/20 rounded-2xl">
                        <h5 className="text-white font-bold mb-2">Developed RJ&apos;s BLOG</h5>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                            Launched a full-featured blogging platform built with React.js and Appwrite, reaching users at rjsblog.in.
                        </p>
                        <div className="flex gap-3">
                            <span className="text-[10px] bg-mine/20 text-mine px-2 py-0.5 rounded border border-mine/30">NEXTJS</span>
                            <span className="text-[10px] bg-mine/20 text-mine px-2 py-0.5 rounded border border-mine/30">APPWRITE</span>
                        </div>
                    </div>
                    <p className="text-xs text-neutral-600 pl-2">
                        Certification: Computer Applications (AiTC, 2023)
                    </p>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                            <span className="text-mine font-bold">BCA</span>
                        </div>
                        <div>
                            <p className="text-white font-bold">Academic Milestone</p>
                            <p className="text-neutral-500 text-xs">NIELIT Imphal</p>
                        </div>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Began Bachelor&apos;s in Computer Applications. Pivoted deep into IoT development, starting with building automation systems on Raspberry Pi and mastering Node.js.
                    </p>
                </div>
            ),
        },
        {
            title: "2021",
            content: (
                <div className="space-y-4">
                    <p className="text-neutral-400 font-semibold">How it all started</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                            <p className="text-2xl font-bold text-white mb-1">01</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">Web Foundations</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                            <p className="text-2xl font-bold text-white mb-1">02</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">Logic & Algo</p>
                        </div>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed italic">
                        &quot;Started the freelance journey and first line of code in HTML. Slowly expanded into C, C++, and Python to understand the hardware-software bridge.&quot;
                    </p>
                </div>
            ),
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 font-merriweather mt-20" id="exp">
            <Title text='Experience' className='flex flex-col items-center justify-center cursor-pointer mb-8 md:mb-16' />
            <div className="relative">
                <Timeline data={data} />
            </div>
        </div>
    );
}
