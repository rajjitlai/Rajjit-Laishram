import { config, databases, imageBucket } from "@/config/appwrite";
import { ID } from "appwrite";

interface ProjectData {
    title: string;
    summary: string;
    problem: string;
    solution: string;
    role: string;
    impact: string;
    project_link: string;
    tech_stack: string[];
    isArchived?: boolean;
}

export const createProject = async (
    data: ProjectData,
    imageFile: File
): Promise<void> => {
    try {
        if (!config.databaseId || !config.projectCollectionsId || !config.profileImagesBucketId) {
            throw new Error("Required configuration is missing");
        }

        // Upload image first
        const uploadedFile = await imageBucket.createFile(
            config.profileImagesBucketId,
            ID.unique(),
            imageFile
        );

        // Get the file URL
        const fileUrl = `${config.endpoint}/storage/buckets/${config.profileImagesBucketId}/files/${uploadedFile.$id}/view?project=${config.projectId}`;

        // Create the project document
        await databases.createDocument(
            config.databaseId,
            config.projectCollectionsId,
            ID.unique(),
            {
                title: data.title,
                summary: data.summary,
                problem: data.problem,
                solution: data.solution,
                role: data.role,
                impact: data.impact,
                project_image_url: fileUrl,
                project_link: data.project_link,
                tech_stack: data.tech_stack,
                isArchived: data.isArchived || false,
            }
        );
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};
