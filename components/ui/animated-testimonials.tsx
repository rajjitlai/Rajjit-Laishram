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

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 2000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);

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
        <div className="max-w-5xl mx-auto antialiased font-sans px-4 py-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative h-72 w-72 mx-auto md:ml-auto md:mr-0 mb-10 md:mb-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-mine/20 via-transparent to-hers/20 rounded-3xl blur-3xl -z-10" />
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.image_url}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: Math.random() * 20 - 10,
                                }}
                                animate={{
                                    opacity: index === active ? 1 : 0.7,
                                    scale: index === active ? 1 : 0.95,
                                    z: index === active ? 0 : -100,
                                    rotate: index === active ? 0 : Math.random() * 20 - 10,
                                    zIndex: index === active ? 50 : testimonials.length + 2 - index,
                                    y: index === active ? [0, -80, 0] : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: Math.random() * 20 - 10,
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 origin-bottom"
                            >
                                <Image
                                    src={testimonial.image_url}
                                    alt={testimonial.name}
                                    width={500}
                                    height={500}
                                    draggable={false}
                                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl border border-zinc-700/50"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="flex justify-between flex-col py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < (testimonials[active].rating || 5)
                                        ? "text-mine fill-mine"
                                        : "text-neutral-700 fill-zinc-800"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <h3 className="text-3xl font-bold dark:text-white text-black">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-sm text-neutral-500 font-mono mt-1">
                            {testimonials[active].role}
                        </p>
                        <motion.p className="text-lg text-neutral-400 mt-8 leading-relaxed italic">
                            {testimonials[active].description.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center group/button hover:bg-zinc-700 transition-colors"
                        >
                            <IconArrowLeft className="h-6 w-6 text-neutral-400 group-hover/button:text-white transition-colors" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center group/button hover:bg-zinc-700 transition-colors"
                        >
                            <IconArrowRight className="h-6 w-6 text-neutral-400 group-hover/button:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
