import { config, databases } from "@/config/appwrite";
import { Models, Query } from "appwrite";

interface Document extends Models.Document {
    title: string;
    description: string;
    project_image_url: string;
    project_link: string;
    tech_stack?: string | string[];
}

interface Project {
    id: string;
    title: string;
    description: string;
    url: string;
    link: string;
    tags: string[];
    createdAt: string;
}

export const getProjects = async (): Promise<Project[]> => {
    try {
        if (!config.databaseId || !config.projectCollectionsId) {
            throw new Error("Database ID or Project Collection ID is not defined");
        }

        const response = await databases.listDocuments<Document>(
            config.databaseId,
            config.projectCollectionsId,
            [Query.orderDesc("$createdAt")]
        );

        return response.documents.map((project: Document): Project => ({
            id: project.$id,
            title: project.title,
            description: project.description,
            url: project.project_image_url,
            link: project.project_link,
            tags: Array.isArray(project.tech_stack)
                ? project.tech_stack
                : typeof project.tech_stack === "string"
                    ? project.tech_stack.split(",").map(tag => tag.trim())
                    : [],
            createdAt: project.$createdAt,
        }));
    } catch (error) {
        console.error("Error getting projects:", error);
        return [];
    }
};
