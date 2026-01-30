import { config, databases } from "@/config/appwrite";
import { Models, Query } from "appwrite";

interface Document extends Models.Document {
    title: string;
    summary: string;
    problem?: string;
    solution?: string;
    role?: string;
    impact?: string;
    project_image_url: string;
    project_link: string;
    tech_stack?: string | string[];
    isArchived?: boolean;
    signals?: string | string[];
}

export interface Project {
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
    createdAt: string;
    isArchived: boolean;
}

export const getProjects = async (includeArchived: boolean = false): Promise<Project[]> => {
    try {
        if (!config.databaseId || !config.projectCollectionsId) {
            throw new Error("Database ID or Project Collection ID is not defined");
        }

        const queries = [Query.orderDesc("$createdAt")];
        if (!includeArchived) {
            queries.push(Query.equal("isArchived", false));
        }

        const response = await databases.listDocuments<Document>(
            config.databaseId,
            config.projectCollectionsId,
            queries
        );

        return response.documents.map((project: Document): Project => ({
            id: project.$id,
            title: project.title,
            summary: project.summary,
            problem: project.problem || "",
            solution: project.solution || "",
            role: project.role || "",
            impact: project.impact || "",
            url: project.project_image_url,
            link: project.project_link,
            tags: Array.isArray(project.tech_stack)
                ? project.tech_stack
                : typeof project.tech_stack === "string"
                    ? project.tech_stack.split(",").map(tag => tag.trim())
                    : [],
            signals: typeof project.signals === "string"
                ? project.signals
                : Array.isArray(project.signals)
                    ? project.signals.join(", ")
                    : "",
            createdAt: project.$createdAt,
            isArchived: !!project.isArchived,
        }));
    } catch (error) {
        console.error("Error getting projects:", error);
        return [];
    }
};
