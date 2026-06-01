"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
    src: string;
    alt: string;
    caption: string;
}

interface ImageCarouselProps {
    images: CarouselImage[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [isHovered, images.length]);

    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const selectIndex = (idx: number) => {
        setCurrentIndex(idx);
    };

    return (
        <div 
            className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 group/carousel select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover object-center opacity-85 transition-all duration-500"
                unoptimized
            />
            
            {/* Navigation arrows */}
            <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-mine transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            >
                <ChevronLeft size={16} />
            </button>
            <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-mine transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            >
                <ChevronRight size={16} />
            </button>

            {/* Progress dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectIndex(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            currentIndex === idx ? "bg-mine w-3" : "bg-zinc-650 hover:bg-zinc-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
