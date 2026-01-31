import React, { useEffect, useState } from "react";
import { getProjects, Project } from "@/lib/getProjects";
import Title from "@/components/Title";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectModal } from "./ProjectModal";
import { motion } from "motion/react";

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



const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // By default getProjects() fetches only active (non-archived) projects
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
        <div className="py-20 p-5 sm:p-0 font-outfit mt-10" id="projects">
            <Title
                text="Missions"
                className="flex flex-col items-center justify-center cursor-pointer mb-12"
            />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 h-[400px] flex flex-col space-y-4">
                            <Skeleton className="h-48 w-full rounded-xl" />
                            <Skeleton className="h-6 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex gap-2 mt-auto">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>
                    ))
                ) : projects.length > 0 ? (
                    projects.map((project, idx) => {
                        const signalList = typeof project.signals === "string"
                            ? project.signals.split(",").map(s => s.trim()).filter(Boolean)
                            : [];
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                data-cursor-text="PROJECT_SCAN"
                                className="group relative bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] overflow-hidden hover:border-mine/50 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-2xl hover:shadow-[0_0_50px_rgba(56,255,66,0.1)]"
                            >
                                {/* Technical ID Label */}
                                <div className="absolute top-4 right-4 z-20 font-mono text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    P-ID_{project.id.slice(0, 8)} {"//"} REV_26
                                </div>

                                {/* Image Container */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                                    <Image
                                        src={project.url}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                                    />

                                    {/* Scanning Line Effect */}
                                    <motion.div
                                        initial={{ top: "-10%" }}
                                        whileHover={{ top: "110%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-[2px] bg-mine/50 shadow-[0_0_15px_#38ff42] z-10 pointer-events-none hidden group-hover:block"
                                    />

                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-30">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="px-8 py-4 bg-zinc-950/90 border border-mine/50 rounded-xl text-mine font-mono font-black tracking-[0.3em] text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-4 shadow-[0_0_50px_rgba(56,255,66,0.2)] uppercase relative overflow-hidden">
                                                <div className="absolute inset-0 bg-mine/5 animate-pulse" />
                                                <span className="text-zinc-700 animate-pulse">[</span> INIT_UPLINK <span className="text-zinc-700 animate-pulse">]</span>
                                            </span>
                                            <span className="text-[10px] font-mono text-mine/50 opacity-0 group-hover:opacity-100 transition-opacity delay-300 animate-pulse">ESTABLISHING_SECURE_CONNECTION...</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1 relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-mine/10 border border-mine/20">
                                                <div className="w-1 h-1 rounded-full bg-mine animate-pulse" />
                                                <span className="text-[8px] font-black uppercase text-mine tracking-widest">Active</span>
                                            </div>

                                            {/* Project Signals Overlay */}
                                            <div className="flex gap-1 ml-2">
                                                {(signalList.length > 0 ? signalList : ['01', '02', '03', '04']).map((_, i) => (
                                                    <div key={i} className="w-1.5 h-1.5 rounded-[1px] bg-mine/30 group-hover:bg-mine transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono text-zinc-700">SIG_STABLE</div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-mine transition-colors line-clamp-1 leading-none uppercase tracking-tighter">
                                        {project.title}
                                    </h3>

                                    <p className="text-zinc-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed font-outfit">
                                        {project.summary}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.slice(0, 3).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-zinc-800/80 text-neutral-300 border border-zinc-700/50"
                                                style={{ color: getTagColor(tag) }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <p className="text-center col-span-full text-neutral-500 py-20">
                        No projects found in this category.
                    </p>
                )}
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default Projects;
