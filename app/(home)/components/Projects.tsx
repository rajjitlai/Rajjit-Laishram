"use client"

import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/getProjects";
import Title from "@/components/Title";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";

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
        <div className="py-10 p-5 sm:p-0 font-merriweather" id="projects">
            <Title
                text="Projects 🪄"
                className="flex flex-col items-center justify-center cursor-pointer"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-20 gap-5">
                {loading ? (
                    <p className="text-center col-span-2 text-gray-500">Loading projects...</p>
                ) : projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id}>
                            <CardContainer className="inter-var">
                                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto p-6 border">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-neutral-600 dark:text-white"
                                    >
                                        {project.title}
                                    </CardItem>
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-neutral-500 text-sm md:text-base max-w-sm mt-2 dark:text-neutral-300"
                                    >
                                        {project.description}
                                    </CardItem>
                                    <CardItem translateZ="100" className="w-full mt-4">
                                        <Image
                                            src={project.url}
                                            height={1000}
                                            width={1000}
                                            className="h-60 w-full object-contain group-hover/card:shadow-xl"
                                            alt={project.title}
                                        />
                                    </CardItem>
                                    <div className="flex justify-between items-center mt-5 flex-col md:flex-row gap-4">
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={project.link}
                                            target="_blank"
                                            className="px-4 py-2 font-normal text-base border border-gray-500 hover:border-mine/[0.5] dark:text-white"
                                        >
                                            View →
                                        </CardItem>
                                        <CardItem translateY={20} className="flex flex-row">
                                            {project.tags.map((tag, index) => (
                                                <CardItem
                                                    key={index}
                                                    className="px-2 py-1 text-sm font-normal"
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
                    <p className="text-center col-span-2 text-gray-500">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
