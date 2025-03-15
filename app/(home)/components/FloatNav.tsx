"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage } from "@tabler/icons-react";
import { MdLaptopWindows, MdOutlineRateReview } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { GiMuscleUp } from "react-icons/gi";

export function FloatNav() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Skills",
            link: "#skills",
            icon: <MdLaptopWindows className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Projects",
            link: "#projects",
            icon: <WiStars className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Experience",
            link: "#exp",
            icon: <GiMuscleUp className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Testimonials",
            link: "#review",
            icon: <MdOutlineRateReview className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Contact",
            link: "#contact",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ];
    return (
        <div className="relative  w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
