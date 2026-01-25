"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function AdminDashboard() {
    const { user, loading, isAdmin, logoutUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-black text-white p-8 font-merriweather pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Title text="Admin Dashboard" className="text-3xl" />
                    <HoverBorderGradient
                        as="button"
                        onClick={() => logoutUser()}
                        className="bg-black text-white flex items-center space-x-2"
                    >
                        <span>Logout</span>
                    </HoverBorderGradient>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Messages Card */}
                    <div
                        onClick={() => router.push("/setup/messages")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <h3 className="text-xl font-bold mb-2 text-mine">Messages</h3>
                        <p className="text-neutral-400">View and manage contact form submissions.</p>
                        <button className="mt-4 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">View Messages &rarr;</button>
                    </div>

                    {/* Testimonials Card */}
                    <div
                        onClick={() => router.push("/setup/testimonials")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <h3 className="text-xl font-bold mb-2 text-mine">Testimonials</h3>
                        <p className="text-neutral-400">Approve or delete user reviews.</p>
                        <button className="mt-4 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">Manage Reviews &rarr;</button>
                    </div>

                    {/* Projects Card */}
                    <div
                        onClick={() => router.push("/setup/projects")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <h3 className="text-xl font-bold mb-2 text-mine">Projects</h3>
                        <p className="text-neutral-400">Add or edit portfolio projects.</p>
                        <button className="mt-4 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">Manage Projects &rarr;</button>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center text-neutral-500">
                        No recent activity found.
                    </div>
                </div>
            </div>
        </div>
    );
}
