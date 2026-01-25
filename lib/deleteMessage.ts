import { config, databases } from "@/config/appwrite";

export const deleteMessage = async (messageId: string): Promise<void> => {
    try {
        if (!config.databaseId || !config.messagesCollectionsId) {
            throw new Error("Database ID or Messages Collection ID is not defined");
        }

        await databases.deleteDocument(
            config.databaseId,
            config.messagesCollectionsId,
            messageId
        );
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
};
