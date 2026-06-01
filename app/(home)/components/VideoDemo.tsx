"use client";

import React, { useRef } from "react";
import { nawaVideo } from "@/lib/systemworks";

export function VideoDemo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const preventDefault = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-3" onContextMenu={preventDefault}>
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 group/video select-none">
                <video
                    ref={videoRef}
                    src={nawaVideo.src}
                    poster={nawaVideo.poster}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onContextMenu={preventDefault}
                />
            </div>
        </div>
    );
}

