import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Title from "@/components/Title";

export function Experience() {
    const data = [
        {
            title: "2025",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Expanding expertise in full-stack development, integrating AI-driven features into applications.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Developing cross-platform mobile applications using React Native, Expo, and NativeWind.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Implementing advanced hardware-software integration with Python, WebSockets, and microcontrollers.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Continuously improving and scaling my personal blogging platform built with React.js and Appwrite.
                    </p>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Began working with clients, delivering custom web applications and digital solutions.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Developed and maintained a music web application using React.js and modern web technologies.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Completed multiple web development projects and reusable templates using React.js and Tailwind CSS.
                    </p>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Contributed open-source web templates on GitHub for the developer community.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Built and deployed personal projects, focusing on frontend and backend development.
                    </p>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Completed several projects, applying newly learned technologies to real-world applications.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Gained hands-on experience with React.js, JavaScript, and backend development.
                    </p>
                </div>
            ),
        },
        {
            title: "2021",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Began my journey in web development, learning HTML, CSS, and JavaScript.
                    </p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Explored various technologies and frameworks, laying the foundation for future projects.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-8 font-merriweather mt-20" id="exp">
            <Title text='Experience 💪' className='flex flex-col items-center justify-center cursor-pointer mb-5' />
            <Timeline data={data} />
        </div>
    );
}
