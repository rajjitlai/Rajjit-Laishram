"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";
import { deleteMessage } from "@/lib/deleteMessage";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function MessagesPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(true);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push("/login");
        }
    }, [user, loading, isAdmin, router]);

    useEffect(() => {
        if (user && isAdmin) {
            fetchMessages();
        }
    }, [user, isAdmin]);

    const fetchMessages = async () => {
        try {
            const fetchedMessages = await getMessages();
            setMessages(fetchedMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleDelete = async (messageId: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            await deleteMessage(messageId);
            setMessages(messages.filter((msg) => msg.id !== messageId));
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Failed to delete message");
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
                    <Title text="Contact Messages" className="text-3xl" />
                    <HoverBorderGradient
                        as="button"
                        onClick={() => router.push("/setup")}
                        className="bg-black text-white flex items-center space-x-2"
                    >
                        <span>← Back to Dashboard</span>
                    </HoverBorderGradient>
                </div>

                {loadingMessages ? (
                    <p className="text-center text-neutral-400">Loading messages...</p>
                ) : messages.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center text-neutral-500">
                        No messages found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-mine">{message.name}</h3>
                                        <p className="text-sm text-neutral-400">{message.email}</p>
                                        <p className="text-xs text-neutral-500 mt-1">
                                            {new Date(message.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(message.id)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p className="text-neutral-300 whitespace-pre-wrap">{message.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
