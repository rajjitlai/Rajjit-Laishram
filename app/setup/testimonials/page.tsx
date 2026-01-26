"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTestimonials } from "@/lib/getAllTestimonials";
import { deleteTestimonial } from "@/lib/deleteTestimonial";
import { updateTestimonial } from "@/lib/updateTestimonial";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    description: string;
    image_url: string;
    rating?: number;
    approved?: boolean;
}

export default function TestimonialsPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState(true);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push("/login");
        }
    }, [user, loading, isAdmin, router]);

    useEffect(() => {
        if (user && isAdmin) {
            fetchTestimonials();
        }
    }, [user, isAdmin]);

    const fetchTestimonials = async () => {
        try {
            const fetchedTestimonials = await getAllTestimonials();
            setTestimonials(fetchedTestimonials);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoadingTestimonials(false);
        }
    };

    const handleDelete = async (testimonialId: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await deleteTestimonial(testimonialId);
            setTestimonials(testimonials.filter((t) => t.id !== testimonialId));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial");
        }
    };

    const handleApprove = async (testimonialId: string) => {
        try {
            await updateTestimonial(testimonialId, { approved: true });

            // Optimistic update
            setTestimonials(testimonials.map(t =>
                t.id === testimonialId ? { ...t, approved: true } : t
            ));

            alert("Testimonial approved successfully!");
        } catch (error) {
            console.error("Error approving testimonial:", error);
            alert("Failed to approve testimonial");
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-merriweather pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Title text="Manage Testimonials" className="text-3xl" />
                    <HoverBorderGradient
                        as="button"
                        onClick={() => router.push("/setup")}
                        className="bg-black text-white flex items-center space-x-2"
                    >
                        <span>← Back to Dashboard</span>
                    </HoverBorderGradient>
                </div>

                {loadingTestimonials ? (
                    <p className="text-center text-neutral-400">Loading testimonials...</p>
                ) : testimonials.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center text-neutral-500">
                        No testimonials found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src={testimonial.image_url}
                                        alt={testimonial.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-mine">{testimonial.name}</h3>
                                        <p className="text-sm text-neutral-400">{testimonial.role}</p>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < (testimonial.rating || 5)
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
                                    </div>
                                </div>
                                <p className="text-neutral-300 text-sm mb-4 line-clamp-4">
                                    {testimonial.description}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => !testimonial.approved && handleApprove(testimonial.id)}
                                        disabled={testimonial.approved}
                                        className={`flex-1 px-3 py-2 text-white text-sm rounded transition-colors ${testimonial.approved
                                                ? "bg-green-900/50 cursor-not-allowed text-green-200 border border-green-800"
                                                : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        {testimonial.approved ? "Approved" : "Approve"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(testimonial.id)}
                                        className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
