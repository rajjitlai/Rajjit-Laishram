"use client"

import React, { useEffect, useState, useRef } from "react";
import Title from "@/components/Title";

export function Experience() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const timelineRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            
            const timelineTop = timelineRef.current.offsetTop;
            const timelineHeight = timelineRef.current.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline has been scrolled through
            const start = timelineTop - windowHeight + 200;
            const end = timelineTop + timelineHeight - 200;
            const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
            
            setScrollProgress(progress * 100);

            // Check which items are visible
            const newVisibleItems = new Set<number>();
            itemRefs.current.forEach((item, index) => {
                if (!item) return;
                const rect = item.getBoundingClientRect();
                if (rect.top < windowHeight - 100) {
                    newVisibleItems.add(index);
                }
            });
            setVisibleItems(newVisibleItems);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const data = [
        {
            title: "2025",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2">
                        IoT Software Developer - <a href="https://nibiaa.com" target="_blank" rel="noopener noreferrer" className="text-mine hover:underline">Nibiaa</a>
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        July 2025 - Present
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Developing IoT solutions for enterprise clients, focusing on warehouse management systems with real-time monitoring and automation.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Building end-to-end IoT systems with cloud connectivity, sensor integration, and real-time data processing using MQTT and HTTP protocols.
                    </p>
                    
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2 mt-6">
                        Software & Autonomous Systems Developer - NIELIT Imphal (Drone Lab)
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        February 2025 - Present
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Creating mobile applications using React Native Expo and debugging code for hardware implementation in drone systems.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Collaborating with team members to optimize server scripts with Python, ensuring seamless operation of autonomous drone applications.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Working on drone communication systems and autonomous flight control software.
                    </p>
                    
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2 mt-6">
                        Student Internship - Airport Authority of India (AAI)
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        February 2025 (10 Days) - Imphal International Airport
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Completed internship in Communication, Navigation, and Surveillance (CNS) domain, gaining hands-on experience with airport systems.
                    </p>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2">
                        Head Developer - Cybrella
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        October 2024 - November 2024 (2 months) - NIELIT Imphal
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Led a team in developing cutting-edge full stack web solutions that integrated creative design with robust backend functionality.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Oversaw project planning, code reviews, and continuous integration practices to ensure project success.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Mentored junior developers and fostered a collaborative problem-solving environment.
                    </p>
                    
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2 mt-6">
                        Full-Stack Developer (Freelance)
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        June 2021 - July 2025 (4 years 2 months)
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Delivered custom web applications and digital solutions for clients worldwide, specializing in responsive and scalable applications.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        <span className="font-semibold">Major Projects:</span>
                    </p>
                    <ul className="list-disc list-inside text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 ml-2">
                        <li>SoundiBeat (Custom Sounds) - Music web application using React.js, discontinued and open-sourced</li>
                        <li>TreatPath Global - Healthcare management platform</li>
                        <li>Cyano Bact Theme - VS Code theme extension</li>
                        <li>Multiple web development projects and reusable templates using React.js, Next.js, and Tailwind CSS</li>
                    </ul>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Implemented hardware-software integration with Python, WebSockets, and microcontrollers (ESP32, Raspberry Pi).
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        <span className="font-semibold">Certification:</span> Cyber Security Certificate - NIELIT Imphal, 2024
                    </p>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-3">
                        Developed <span className="font-semibold">RJ&apos;s BLOG (rjsblog.in)</span> - A blogging platform built with React.js and Appwrite.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-3">
                        Contributed open-source web templates and personal projects to GitHub.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
                        <span className="font-semibold">Certification:</span> Computer Applications Certificate - AiTC, 2023
                    </p>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-bold mb-2">
                        Education - NIELIT Imphal
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-3">
                        Started Bachelor&apos;s degree in Computer Applications (June 2022 - July 2025)
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
                        Built personal projects with React.js, Node.js, and started IoT development with Raspberry Pi.
                    </p>
                </div>
            ),
        },
        {
            title: "2021",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-3">
                        Began freelance journey and web development career with HTML, CSS, and JavaScript.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
                        Learned programming fundamentals: C, C++, Python, C#, SQL, and database management.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-8 font-merriweather mt-20" id="exp">
            <Title text='Experience 💪' className='flex flex-col items-center justify-center cursor-pointer mb-16' />
            
            <div className="relative" ref={timelineRef}>
                {/* Center vertical line - background */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-800 hidden lg:block"></div>
                
                {/* Center vertical line - animated progress */}
                <div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-mine via-hers to-mine hidden lg:block transition-all duration-300 ease-out"
                    style={{ height: `${scrollProgress}%` }}
                ></div>
                
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        ref={(el) => { itemRefs.current[index] = el; }}
                        className={`mb-16 lg:mb-24 flex flex-col lg:flex-row items-center transition-all duration-700 ${
                            index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                        } ${
                            visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        {/* Content */}
                        <div className={`w-full lg:w-[45%] ${
                            index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'
                        }`}>
                            <div className="bg-black border border-gray-800 p-6 hover:border-mine transition-all duration-300 hover:shadow-lg hover:shadow-mine/20">
                                {item.content}
                            </div>
                        </div>
                        
                        {/* Year badge in center */}
                        <div className="w-full lg:w-[10%] flex justify-center items-center my-4 lg:my-0 z-10">
                            <div className="bg-black border-2 border-mine px-6 py-3 text-mine font-bold text-xl shadow-lg shadow-mine/30">
                                {item.title}
                            </div>
                        </div>
                        
                        {/* Empty space for alternating layout */}
                        <div className="hidden lg:block w-[45%]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}