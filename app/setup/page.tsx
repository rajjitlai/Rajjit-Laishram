"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { getMessages } from "@/lib/getMessages";
import { getAllTestimonials } from "@/lib/getAllTestimonials";
import { getProjects } from "@/lib/getProjects";

export default function AdminDashboard() {
    const { user, loading, logoutUser } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ messages: 0, reviews: 0, projects: 0 });
    const [recentActivity, setRecentActivity] = useState<{
        id: string;
        type: 'message' | 'review' | 'project';
        date: string;
        title: string;
        desc: string;
        meta?: string;
    }[]>([]);
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const [msgs, reviews, projs] = await Promise.all([
                    getMessages(),
                    getAllTestimonials(),
                    getProjects()
                ]);

                setStats({
                    messages: msgs.length,
                    reviews: reviews.length,
                    projects: projs.length
                });

                type ActivityItem = {
                    id: string;
                    type: 'message' | 'review' | 'project';
                    date: string;
                    title: string;
                    desc: string;
                    meta?: string;
                };

                const activity: ActivityItem[] = [
                    ...msgs.map(m => ({
                        id: m.id,
                        type: 'message' as const,
                        date: m.createdAt,
                        title: `Message from ${m.name}`,
                        desc: m.message.substring(0, 50) + (m.message.length > 50 ? '...' : ''),
                        meta: m.email
                    })),
                    ...reviews.map(r => ({
                        id: r.id,
                        type: 'review' as const,
                        date: r.createdAt,
                        title: `Review by ${r.name}`,
                        desc: r.description.substring(0, 50) + (r.description.length > 50 ? '...' : ''),
                        meta: `${r.rating} stars`
                    })),
                    ...projs.map(p => ({
                        id: p.id,
                        type: 'project' as const,
                        date: p.createdAt,
                        title: `New Project: ${p.title}`,
                        desc: p.description.substring(0, 50) + (p.description.length > 50 ? '...' : ''),
                        meta: p.tags.slice(0, 2).join(", ")
                    }))
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5);

                setRecentActivity(activity);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;

    if (!user) return null;

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Messages Card */}
                    <div
                        onClick={() => router.push("/setup/messages")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-mine">Messages</h3>
                                <p className="text-neutral-400 text-sm">Contact submissions</p>
                            </div>
                            <span className="text-4xl font-bold text-white opacity-80">{isLoadingStats ? '-' : stats.messages}</span>
                        </div>
                        <button className="mt-6 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">View Messages &rarr;</button>
                    </div>

                    {/* Testimonials Card */}
                    <div
                        onClick={() => router.push("/setup/testimonials")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-mine">Testimonials</h3>
                                <p className="text-neutral-400 text-sm">Product reviews</p>
                            </div>
                            <span className="text-4xl font-bold text-white opacity-80">{isLoadingStats ? '-' : stats.reviews}</span>
                        </div>
                        <button className="mt-6 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">Manage Reviews &rarr;</button>
                    </div>

                    {/* Projects Card */}
                    <div
                        onClick={() => router.push("/setup/projects")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-mine cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-mine">Projects</h3>
                                <p className="text-neutral-400 text-sm">Portfolio items</p>
                            </div>
                            <span className="text-4xl font-bold text-white opacity-80">{isLoadingStats ? '-' : stats.projects}</span>
                        </div>
                        <button className="mt-6 text-sm underline decoration-mine underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">Manage Projects &rarr;</button>
                    </div>

                    {/* Resume Card */}
                    <div
                        onClick={() => router.push("/setup/resume")}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-hers cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-hers">Resume</h3>
                                <p className="text-neutral-400 text-sm">CV file upload</p>
                            </div>
                            <div className="p-2 bg-hers/10 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hers"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                        </div>
                        <button className="mt-6 text-sm underline decoration-hers underline-offset-4 group-hover:translate-x-1 transition-transform inline-block">Update Resume &rarr;</button>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                    {isLoadingStats ? (
                        <div className="text-neutral-500">Loading activity...</div>
                    ) : recentActivity.length > 0 ? (
                        <div className="grid gap-4">
                            {recentActivity.map((item) => (
                                <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex items-center justify-between hover:bg-zinc-900 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${item.type === 'message' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {item.type === 'message' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{item.title}</p>
                                            <p className="text-neutral-400 text-xs">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-neutral-500">{new Date(item.date).toLocaleDateString()}</p>
                                        <p className="text-xs text-neutral-600 font-mono mt-1">{item.meta}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center text-neutral-500">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
