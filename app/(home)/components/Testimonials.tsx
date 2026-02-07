"use client"

import Title from "@/components/Title";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { getTestimonials } from "@/lib/getTestimonials";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FaPen } from "react-icons/fa";

type Testimonial = {
    id: string;
    name: string;
    description: string;
    role: string;
    image_url: string;
    rating?: number;
};

export function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const fetchedTestimonials = await getTestimonials();
                const formattedTestimonials = fetchedTestimonials.map((t: Testimonial) => ({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    role: t.role,
                    image_url: t.image_url,
                    rating: t.rating,
                }));

                setTestimonials(formattedTestimonials);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) return (
        <div className="py-20 p-5 sm:p-0 font-outfit relative" id="review">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mine/5 blur-[120px] rounded-full -z-10" />
            <Title text="Feedback" className="flex flex-col items-center justify-center cursor-pointer mb-10" />
            <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <Skeleton className="h-72 w-72 mx-auto md:ml-auto md:mr-0 rounded-3xl" />
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-5 w-5 rounded-sm" />)}
                        </div>
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-20 p-5 sm:p-0 font-outfit relative overflow-hidden" id="review">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-hers/5 blur-[150px] rounded-full -z-10" />

            <Title text="Feedback" className="flex flex-col items-center justify-center cursor-pointer mb-5" />

            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

            {testimonials.length > 0 && (
                <div className="flex justify-center mt-12">
                    <MagneticButton>
                        <Link href="/review">
                            <HoverBorderGradient
                                containerClassName="rounded-xl"
                                as="div"
                                className="dark:bg-zinc-900 bg-white text-black dark:text-white flex items-center justify-center space-x-2 px-6 py-2.5 text-sm font-medium transition-all group"
                            >
                                <span className="flex items-center gap-2">
                                    <FaPen className="w-3.5 h-3.5 text-mine group-hover:scale-110 transition-transform" />
                                    Write a Review
                                </span>
                            </HoverBorderGradient>
                        </Link>
                    </MagneticButton>
                </div>
            )}
        </div>
    );
}
