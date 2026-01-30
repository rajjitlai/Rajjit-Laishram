"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

export function FloatNav() {
    const navItems = [
        { name: "Init", link: "#hero" },
        { name: "Metrics", link: "#stats" },
        { name: "Arsenal", link: "#skills" },
        { name: "Missions", link: "#projects" },
        { name: "Chronicles", link: "#exp" },
        { name: "Feedback", link: "#review" },
        { name: "Uplink", link: "#contact" },
    ];
    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
