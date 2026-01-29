import React, { useEffect, useState } from "react";
import { getProjects, Project } from "@/lib/getProjects";
import Title from "@/components/Title";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectModal } from "./ProjectModal";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
    const [activeTab, setActiveTab] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        <div className="py-20 p-5 sm:p-0 font-merriweather mt-10" id="projects">
            <Title
                text="Projects"
                className="flex flex-col items-center justify-center cursor-pointer mb-12"
            />

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["all", "websites", "apps", "themes"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize border",
                            activeTab === tab
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-zinc-900/50 text-neutral-400 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

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
                ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-mine/50 hover:shadow-[0_0_30px_rgba(56,255,66,0.1)] transition-all duration-300 cursor-pointer flex flex-col h-full ring-1 ring-transparent hover:ring-mine/20"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                                <Image
                                    src={project.url}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                        View Details <span className="text-mine">→</span>
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1 relative z-10 bg-zinc-900/40 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-mine transition-colors line-clamp-1">
                                    {project.title}
                                </h3>

                                <p className="text-neutral-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
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
                                    {project.tags.length > 3 && (
                                        <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-zinc-800/80 text-neutral-500 border border-zinc-700/50">
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
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
