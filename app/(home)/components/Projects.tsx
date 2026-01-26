"use client"

import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/getProjects";
import Title from "@/components/Title";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const tagColorMap: { [key: string]: string } = {
    reactjs: "#61DAFB",
    nextjs: "#0070F3",
    tailwindcss: "#38B2AC",
    ts: "#3178C6",
    js: "#F1E05A",
    firebase: "#FFCA28",
    nodejs: "#339933",
    mongodb: "#47A248",
    graphql: "#E10098",
    appwrite: "#fd366e",
    theme: "#55eefd",
    vscode: "#24adf3",
    // IoT related tags
    iot: "#00BFFF",
    mqtt: "#FF6B35",
    raspberry: "#D40000",
    arduino: "#00979D",
    esp32: "#E7352C",
    aws: "#FF9900",
    "cloud-platform": "#4B8BF5",
    sensors: "#32CD32",
    python: "#3776AB",
    cplusplus: "#00599C",
    default: "#55eefd",
};

const getTagColor = (tag: string): string => {
    const lowerCaseTag = tag.toLowerCase();
    // Handle compound tags like "raspberry-pi" or "cloud-platform"
    if (lowerCaseTag.includes('raspberry') && lowerCaseTag.includes('pi')) {
        return tagColorMap.raspberry;
    }
    if (lowerCaseTag.includes('cloud') && lowerCaseTag.includes('platform')) {
        return tagColorMap['cloud-platform'];
    }
    return tagColorMap[lowerCaseTag] || tagColorMap.default;
};

type Project = {
    id: string;
    title: string;
    description: string;
    url: string;
    link: string;
    tags: string[];
};

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const filteredProjects = projects.filter(project => {
        const tags = project.tags.map(t => t.toLowerCase());
        const isApp = tags.some(tag => ['mobile', 'react-native', 'ios', 'android', 'flutter', 'kotlin', 'swift', 'app'].includes(tag));
        const isTheme = tags.some(tag => ['theme', 'vscode', 'extension'].includes(tag));

        if (activeTab === "all") return true;
        if (activeTab === "apps") return isApp;
        if (activeTab === "themes") return isTheme;
        if (activeTab === "websites") return !isApp && !isTheme;
        return true;
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await getProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="py-10 p-5 sm:p-0 font-merriweather mt-16" id="projects">
            <Title
                text="Projects"
                className="flex flex-col items-center justify-center cursor-pointer"
            />
            <div className="flex flex-wrap justify-center gap-4 mt-10 mb-8">
                {["all", "websites", "apps", "themes"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${activeTab === tab
                            ? "bg-white text-black dark:bg-white dark:text-black shadow-lg scale-105"
                            : "bg-neutral-100 text-neutral-600 dark:bg-zinc-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-xl bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.2] p-6 h-auto min-h-[350px] flex flex-col">
                            <Skeleton className="h-6 w-1/3 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-6" />
                            <Skeleton className="w-full aspect-video rounded-lg" />
                        </div>
                    ))
                ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id}>
                            <CardContainer className="inter-var">
                                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto p-3 border">
                                    <CardItem
                                        translateZ="50"
                                        className="text-sm font-bold text-neutral-600 dark:text-white"
                                    >
                                        {project.title}
                                    </CardItem>
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-neutral-500 text-xs mt-1.5 dark:text-neutral-300 line-clamp-2"
                                    >
                                        {project.description}
                                    </CardItem>
                                    <CardItem translateZ="100" className="w-full mt-4">
                                        {(() => {
                                            const tags = project.tags.map(t => t.toLowerCase());
                                            const isMobile = tags.some(tag =>
                                                ['mobile', 'react-native', 'ios', 'android', 'flutter', 'kotlin', 'swift', 'app'].includes(tag)
                                            );
                                            const isTheme = tags.some(tag =>
                                                ['theme', 'vscode', 'extension'].includes(tag)
                                            );

                                            if (isMobile) {
                                                return (
                                                    <div className="flex justify-center w-full h-[360px] items-center">
                                                        <Link href={project.link} target="_blank" className="cursor-pointer block">
                                                            <div className="relative w-[180px] h-[360px] bg-black rounded-[30px] border-[8px] border-zinc-800 overflow-hidden shadow-xl group-hover/card:shadow-2xl transition-all duration-500 ring-1 ring-zinc-700/50">
                                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-zinc-800 rounded-b-xl z-20"></div>
                                                                <div className="relative w-full h-full bg-zinc-900 group-hover/card:scale-[1.02] transition-transform duration-500">
                                                                    <Image
                                                                        src={project.url}
                                                                        height={800}
                                                                        width={400}
                                                                        className="w-full h-full object-cover"
                                                                        alt={project.title}
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                                                        <p className="text-white font-bold tracking-widest uppercase text-xs">View App</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            }

                                            if (isTheme) {
                                                return (
                                                    <div className="flex justify-center w-full h-[360px] items-center">
                                                        <Link href={project.link} target="_blank" className="w-full cursor-pointer block">
                                                            <div className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-[#1e1e1e] group-hover/card:shadow-2xl transition-all duration-500">
                                                                <div className="h-7 bg-[#252526] flex items-center px-0 border-b border-[#1e1e1e]">
                                                                    <div className="w-8 h-full flex items-center justify-center border-r border-[#1e1e1e] bg-[#333333]">
                                                                        <div className="w-4 h-4 rounded-sm bg-blue-500/20"></div>
                                                                    </div>
                                                                    <div className="px-3 h-full bg-[#1e1e1e] flex items-center gap-2 border-t mt-[1px] border-t-blue-500 text-[10px] text-white">
                                                                        <span className="text-blue-400">JSON</span>
                                                                        <span>theme.json</span>
                                                                        <span className="text-zinc-500 ml-1">×</span>
                                                                    </div>
                                                                    <div className="px-3 h-full flex items-center gap-2 text-[10px] text-zinc-500">
                                                                        <span>readme.md</span>
                                                                    </div>
                                                                </div>

                                                                <div className="relative aspect-video w-full overflow-hidden group-hover/card:scale-[1.02] transition-transform duration-500">
                                                                    <Image
                                                                        src={project.url}
                                                                        height={600}
                                                                        width={600}
                                                                        className="w-full h-full object-cover object-top"
                                                                        alt={project.title}
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                                        <p className="text-white font-bold tracking-widest uppercase text-xs">View Theme</p>
                                                                    </div>
                                                                </div>
                                                                <div className="h-4 bg-[#007acc] flex items-center px-2 justify-between text-[8px] text-white">
                                                                    <div className="flex gap-2">
                                                                        <span>main*</span>
                                                                        <span>0 errors</span>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <span>Ln 12, Col 4</span>
                                                                        <span>UTF-8</span>
                                                                        <span>JSON</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div className="flex justify-center w-full h-[360px] items-center">
                                                    <Link href={project.link} target="_blank" className="w-full cursor-pointer block">
                                                        <div className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 group-hover/card:shadow-2xl transition-all duration-500">
                                                            <div className="h-6 bg-zinc-800 flex items-center gap-1.5 px-3 border-b border-zinc-700">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                                                <div className="ml-2 w-full max-w-[100px] h-1.5 bg-zinc-700 rounded-full opacity-50"></div>
                                                            </div>

                                                            <div className="relative aspect-video w-full overflow-hidden group-hover/card:scale-[1.02] transition-transform duration-500">
                                                                <Image
                                                                    src={project.url}
                                                                    height={600}
                                                                    width={600}
                                                                    className="w-full h-full object-cover object-top"
                                                                    alt={project.title}
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                                    <p className="text-white font-bold tracking-widest uppercase text-xs">View Project</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })()}
                                    </CardItem>
                                    <div className="flex justify-between items-center mt-2 gap-2">
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={project.link}
                                            target="_blank"
                                            className="px-2 py-1 font-normal text-xs border border-gray-500 hover:border-mine/[0.5] dark:text-white"
                                        >
                                            View →
                                        </CardItem>
                                        <CardItem translateY={20} className="flex flex-row flex-wrap gap-1">
                                            {project.tags.slice(0, 2).map((tag, index) => (
                                                <CardItem
                                                    key={index}
                                                    className="px-1.5 py-0.5 text-[10px] font-normal"
                                                    style={{ color: getTagColor(tag) }}
                                                >
                                                    #{tag}
                                                </CardItem>
                                            ))}
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
