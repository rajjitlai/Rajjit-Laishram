"use client"

import Title from "@/components/Title";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { getTestimonials } from "@/lib/getTestimonials";
import { useEffect, useState } from "react";

type Testimonial = {
    id: string;
    name: string;
    description: string;
    role: string;
    image_url: string;
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

    if (loading) return <p className="text-center mt-20">Loading testimonials...</p>;

    return (
        <div className="py-10 p-5 sm:p-0 font-merriweather mt-20" id="review">
            <Title text="What people say?" className="flex flex-col items-center justify-center cursor-pointer" />
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
