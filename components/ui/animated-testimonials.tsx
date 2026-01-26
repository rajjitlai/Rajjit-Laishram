"use client";

import { IconArrowLeft, IconArrowRight, IconPencil } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { HoverBorderGradient } from "./hover-border-gradient";
import { MagneticButton } from "./magnetic-button";

type Testimonial = {
    name: string;
    description: string;
    role: string;
    image_url: string;
    rating?: number;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = useCallback(() => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // const isActive = (index: number) => index === active;

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);

    // const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-3xl text-center max-w-lg w-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white transform rotate-12">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 7.29177 14.017 6 14.017 6V3C6.01701 3 3.01702 11.2086 3.01702 18V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16 7.29177 21.017 6 21.017 6V3C13.017 3 10.017 11.2086 10.017 18V21H21.017Z" fill="currentColor" />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">No reviews yet</h3>
                    <p className="text-neutral-400 mb-8 relative z-10">
                        I&apos;d love to hear your feedback! Be the first one to share your experience working with me.
                    </p>

                    <div className="flex justify-center relative z-10">
                        <MagneticButton>
                            <Link href="/review">
                                <HoverBorderGradient
                                    containerClassName=""
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 px-8 py-3"
                                >
                                    <span className="flex items-center gap-2"><IconPencil className="w-4 h-4" /> Write a Review</span>
                                </HoverBorderGradient>
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
            <div className="relative px-4">
                <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
                    <button
                        onClick={handlePrev}
                        className="h-10 w-10 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center group/button hover:scale-110 transition-transform"
                    >
                        <IconArrowLeft className="h-6 w-6 text-black dark:text-neutral-400" />
                    </button>
                </div>

                <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
                    <button
                        onClick={handleNext}
                        className="h-10 w-10 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center group/button hover:scale-110 transition-transform"
                    >
                        <IconArrowRight className="h-6 w-6 text-black dark:text-neutral-400" />
                    </button>
                </div>

                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg
                                    width="100"
                                    height="100"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white transform rotate-12"
                                >
                                    <path
                                        d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 7.29177 14.017 6 14.017 6V3C6.01701 3 3.01702 11.2086 3.01702 18V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16 7.29177 21.017 6 21.017 6V3C13.017 3 10.017 11.2086 10.017 18V21H21.017Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                                <div className="shrink-0">
                                    <Image
                                        src={testimonials[active].image_url}
                                        alt={testimonials[active].name}
                                        width={120}
                                        height={120}
                                        className="h-24 w-24 md:h-32 md:w-32 rounded-2xl object-cover border-2 border-zinc-700 shadow-xl"
                                        draggable={false}
                                        priority
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex gap-1 justify-center md:justify-start mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < (testimonials[active].rating || 5)
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "text-neutral-600 fill-neutral-600"
                                                    }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl font-medium text-neutral-200 leading-relaxed mb-6">
                                        &quot;{testimonials[active].description}&quot;
                                    </p>

                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {testimonials[active].name}
                                        </h3>
                                        <p className="text-sm text-neutral-400">
                                            {testimonials[active].role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};