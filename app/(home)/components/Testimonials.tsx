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
        <div className="py-10 p-5 sm:p-0 font-merriweather mt-20" id="review">
            <Title text="What people say?" className="flex flex-col items-center justify-center cursor-pointer" />
            <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20">
                <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl w-full flex flex-col md:flex-row gap-8">
                    <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-4 py-2">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-5 w-5 rounded-sm" />
                            ))}
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[95%]" />

                        <div className="pt-4">
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-10 p-5 sm:p-0 font-merriweather mt-20" id="review">
            <Title text="What people say?" className="flex flex-col items-center justify-center cursor-pointer" />
            <AnimatedTestimonials testimonials={testimonials} />
            {testimonials.length > 0 && (
                <div className="flex justify-center mt-8">
                    <MagneticButton>
                        <Link href="/review">
                            <HoverBorderGradient
                                containerClassName=""
                                as="button"
                                className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 px-8 py-3"
                            >
                                <span className="flex items-center gap-2"><FaPen className="w-4 h-4" /> Write a Review</span>
                            </HoverBorderGradient>
                        </Link>
                    </MagneticButton>
                </div>
            )}
        </div>
    );
}
