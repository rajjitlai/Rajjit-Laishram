import { config, databases, imageBucket } from "@/config/appwrite";
import { ID } from "appwrite";

interface ProjectUpdateData {
    title?: string;
    summary?: string;
    problem?: string;
    solution?: string;
    role?: string;
    impact?: string;
    project_link?: string;
    tech_stack?: string[];
    project_image_url?: string;
    isArchived?: boolean;
    signals?: string[];
}

export const updateProject = async (
    projectId: string,
    data: ProjectUpdateData,
    imageFile?: File
): Promise<void> => {
    try {
        if (!config.databaseId || !config.projectCollectionsId) {
            throw new Error("Database ID or Project Collection ID is not defined");
        }

        const updateData = { ...data };

        // If a new image is provided, upload it
        if (imageFile && config.profileImagesBucketId) {
            const uploadedFile = await imageBucket.createFile(
                config.profileImagesBucketId,
                ID.unique(),
                imageFile
            );

            const fileUrl = `${config.endpoint}/storage/buckets/${config.profileImagesBucketId}/files/${uploadedFile.$id}/view?project=${config.projectId}`;
            updateData.project_image_url = fileUrl;
        }

        await databases.updateDocument(
            config.databaseId,
            config.projectCollectionsId,
            projectId,
            updateData
        );
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
};
