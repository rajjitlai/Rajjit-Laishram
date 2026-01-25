import { config, databases } from "@/config/appwrite";

export const deleteProject = async (projectId: string): Promise<void> => {
    try {
        if (!config.databaseId || !config.projectCollectionsId) {
            throw new Error("Database ID or Project Collection ID is not defined");
        }

        await databases.deleteDocument(
            config.databaseId,
            config.projectCollectionsId,
            projectId
        );
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};
