"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/getProjects";
import { deleteProject } from "@/lib/deleteProject";
import { createProject } from "@/lib/createProject";
import { updateProject } from "@/lib/updateProject";
import Title from "@/components/Title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


interface Project {
    id: string;
    title: string;
    summary: string;
    problem: string;
    solution: string;
    role: string;
    impact: string;
    url: string;
    link: string;
    tags: string[];
    signals: string;
    isArchived: boolean;
}

export default function ProjectsPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Form state
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [problem, setProblem] = useState("");
    const [solution, setSolution] = useState("");
    const [role, setRole] = useState("");
    const [impact, setImpact] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [techStack, setTechStack] = useState("");
    const [signals, setSignals] = useState("");
    const [isArchived, setIsArchived] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push("/login");
        }
    }, [user, loading, isAdmin, router]);

    useEffect(() => {
        if (user && isAdmin) {
            fetchProjects();
        }
    }, [user, isAdmin]);

    const fetchProjects = async () => {
        try {
            const fetchedProjects = await getProjects(true); // Fetch all including inactive
            setProjects(fetchedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingProjects(false);
        }
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await deleteProject(projectId);
            setProjects(projects.filter((p) => p.id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project");
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setTitle(project.title);
        setSummary(project.summary);
        setProblem(project.problem);
        setSolution(project.solution);
        setRole(project.role);
        setImpact(project.impact);
        setProjectLink(project.link);
        setTechStack(project.tags.join(", "));
        setSignals(Array.isArray(project.signals) ? project.signals.join(", ") : project.signals || "");
        setIsArchived(project.isArchived);
        setShowForm(true);
    };

    const resetForm = () => {
        setTitle("");
        setSummary("");
        setProblem("");
        setSolution("");
        setRole("");
        setImpact("");
        setProjectLink("");
        setTechStack("");
        setSignals("");
        setIsArchived(false);
        setImageFile(null);
        setEditingProject(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile && !editingProject) {
            alert("Please upload a project image");
            return;
        }

        try {
            const projectData = {
                title,
                summary,
                problem,
                solution,
                role,
                impact,
                project_link: projectLink,
                tech_stack: techStack.split(",").map((tag) => tag.trim()),
                signals: signals, // Keeping it as a string
                isArchived,
            };

            if (editingProject) {
                await updateProject(editingProject.id, projectData, imageFile || undefined);
                alert("Project updated successfully!");
            } else {
                await createProject(projectData, imageFile!);
                alert("Project created successfully!");
            }

            resetForm();
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
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
                    <Title text="Manage Projects" className="text-3xl" />
                    <div className="flex gap-4">
                        <HoverBorderGradient
                            as="button"
                            onClick={() => {
                                resetForm();
                                setShowForm(!showForm);
                            }}
                            className="bg-black text-white flex items-center space-x-2"
                        >
                            <span>{showForm ? "Cancel" : "+ New Project"}</span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            as="button"
                            onClick={() => router.push("/setup")}
                            className="bg-black text-white flex items-center space-x-2"
                        >
                            <span>← Back to Dashboard</span>
                        </HoverBorderGradient>
                    </div>
                </div>

                {showForm && (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-8">
                        <h3 className="text-xl font-bold mb-4 text-mine">
                            {editingProject ? "Edit Project" : "Create New Project"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="IoT Smart Home System"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="link">Project Link</Label>
                                    <Input
                                        id="link"
                                        placeholder="https://github.com/..."
                                        value={projectLink}
                                        onChange={(e) => setProjectLink(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="summary">Summary</Label>
                                <textarea
                                    id="summary"
                                    placeholder="Brief summary used in cards..."
                                    rows={2}
                                    className={cn(
                                        "border-2 w-full p-4 focus-visible:ring-[2px] focus:ring-neutral-600 outline-none resize-none text-sm bg-zinc-800 rounded"
                                    )}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="problem">Problem</Label>
                                    <textarea
                                        id="problem"
                                        placeholder="What problem does this solve?"
                                        rows={3}
                                        className={cn(
                                            "border-2 w-full p-4 focus-visible:ring-[2px] focus:ring-neutral-600 outline-none resize-none text-sm bg-zinc-800 rounded"
                                        )}
                                        value={problem}
                                        onChange={(e) => setProblem(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="solution">Solution</Label>
                                    <textarea
                                        id="solution"
                                        placeholder="How did you solve it?"
                                        rows={3}
                                        className={cn(
                                            "border-2 w-full p-4 focus-visible:ring-[2px] focus:ring-neutral-600 outline-none resize-none text-sm bg-zinc-800 rounded"
                                        )}
                                        value={solution}
                                        onChange={(e) => setSolution(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="role">My Role</Label>
                                    <Input
                                        id="role"
                                        placeholder="Lead IoT Developer"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="impact">Impact</Label>
                                    <Input
                                        id="impact"
                                        placeholder="Reduced energy costs by 20%"
                                        value={impact}
                                        onChange={(e) => setImpact(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isArchived"
                                    checked={isArchived}
                                    onChange={(e) => setIsArchived(e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-mine focus:ring-mine accent-mine"
                                />
                                <Label htmlFor="isArchived" className="cursor-pointer">Archived (Hidden from public view)</Label>
                            </div>
                            <div>
                                <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                                <Input
                                    id="techStack"
                                    placeholder="ReactJS, NextJS, IoT, MQTT"
                                    value={techStack}
                                    onChange={(e) => setTechStack(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signals">Project Signals (max 3, comma-separated)</Label>
                                <Input
                                    id="signals"
                                    placeholder="IoT System, Real-time, AI Integration"
                                    value={signals}
                                    onChange={(e) => setSignals(e.target.value)}
                                />
                                <p className="text-xs text-neutral-500 mt-1">Short, 1-2 word tags for simple scanning. Manual entry.</p>
                            </div>
                            <div>
                                <Label htmlFor="image">Project Image {editingProject && "(Leave empty to keep current)"}</Label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                                    required={!editingProject}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-br from-mine to-hers text-white py-3 rounded font-medium hover:opacity-90 transition-opacity"
                            >
                                {editingProject ? "Update Project" : "Create Project"}
                            </button>
                        </form>
                    </div>
                )}

                {loadingProjects ? (
                    <p className="text-center text-neutral-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center text-neutral-500">
                        No projects found. Create your first project!
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.slice((currentPage - 1) * 9, currentPage * 9).map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all flex flex-col h-full"
                                >
                                    <div className="relative h-40 w-full mb-4">
                                        <Image
                                            src={project.url}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-mine mb-2 flex items-center flex-wrap gap-2">
                                        {project.title}
                                        {project.isArchived &&
                                            <span className="text-[10px] bg-red-900/50 text-red-200 px-2 py-0.5 rounded border border-red-800 uppercase tracking-wider">
                                                Archived
                                            </span>
                                        }
                                    </h3>
                                    <p className="text-neutral-300 text-sm mb-3 line-clamp-2 flex-grow">
                                        {project.summary}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                                        {project.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-zinc-800 text-xs rounded text-neutral-400"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {projects.length > 9 && (
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-neutral-400">
                                    Page {currentPage} of {Math.ceil(projects.length / 9)}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(projects.length / 9), p + 1))}
                                    disabled={currentPage === Math.ceil(projects.length / 9)}
                                    className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
