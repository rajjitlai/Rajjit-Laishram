"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { updateResume } from "@/lib/updateResume";
import { getResume } from "@/lib/getResume";
import { FaFilePdf, FaUpload, FaExternalLinkAlt } from "react-icons/fa";

export default function ResumeManagementPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [currentResumeUrl, setCurrentResumeUrl] = useState<string | URL | null>(null);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push("/login");
        }
    }, [user, loading, isAdmin, router]);

    useEffect(() => {
        if (user && isAdmin) {
            try {
                const url = getResume();
                setCurrentResumeUrl(url);
            } catch (error) {
                console.error("Error getting current resume URL:", error);
            }
        }
    }, [user, isAdmin]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        setIsUploading(true);
        try {
            await updateResume(file);
            alert("Resume updated successfully!");
            setFile(null);
            // Refresh URL
            const url = getResume();
            setCurrentResumeUrl(url);
        } catch (error) {
            console.error("Failed to upload resume:", error);
            alert("Failed to upload resume. Check console for details.");
        } finally {
            setIsUploading(false);
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
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Title text="Manage Resume" className="text-3xl" />
                    <HoverBorderGradient
                        as="button"
                        onClick={() => router.push("/setup")}
                        className="bg-black text-white flex items-center space-x-2"
                    >
                        <span>← Back to Dashboard</span>
                    </HoverBorderGradient>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current Resume View */}
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-mine/20 rounded-full flex items-center justify-center mb-4">
                            <FaFilePdf className="text-mine text-4xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Current Resume</h3>
                        <p className="text-neutral-400 text-sm mb-6">
                            This is the file users see when they click "Download Resume" on your homepage.
                        </p>

                        <div className="flex gap-4 w-full">
                            <a
                                href={currentResumeUrl?.toString()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                            >
                                <FaExternalLinkAlt className="text-sm" /> View Current
                            </a>
                        </div>
                    </div>

                    {/* Upload New Resume */}
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col">
                        <h3 className="text-xl font-bold mb-4 text-hers">Upload New Version</h3>
                        <p className="text-neutral-400 text-sm mb-6">
                            Upload a new PDF file to replace the current resume. Make sure it's a valid PDF document.
                        </p>

                        <div className="flex-1 flex flex-col justify-center gap-6">
                            <div className="relative border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-hers transition-colors group">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <FaUpload className="mx-auto text-3xl text-neutral-500 mb-4 group-hover:text-hers transition-colors" />
                                <p className="text-sm text-neutral-300">
                                    {file ? file.name : "Click or drag PDF here to upload"}
                                </p>
                                {file && (
                                    <p className="text-xs text-neutral-500 mt-2">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={!file || isUploading}
                                className="w-full bg-gradient-to-r from-mine to-hers text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload /> Replace Resume
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl">
                    <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                        💡 Admin Tip
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        To maintain direct download links, this tool attempts to use the same File ID defined in your environment variables.
                        If the upload fails, ensure that the File ID <code className="bg-black px-1 rounded text-blue-300">{process.env.NEXT_PUBLIC_APPWRITE_PROJECT_RESUME_FILE_ID}</code> is correctly set in your Appwrite bucket permissions.
                    </p>
                </div>
            </div>
        </div>
    );
}
