"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then(mod => mod.CustomCursor), { ssr: false });

export function GlobalClientComponents() {
    return <CustomCursor />;
}
