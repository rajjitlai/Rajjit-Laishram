import { config, databases } from "@/config/appwrite";
import { Models, Query } from "appwrite";

interface MessageDocument extends Models.Document {
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export const getMessages = async (): Promise<Message[]> => {
    try {
        if (!config.databaseId || !config.messagesCollectionsId) {
            throw new Error("Database ID or Messages Collection ID is not defined");
        }

        const response = await databases.listDocuments<MessageDocument>(
            config.databaseId,
            config.messagesCollectionsId,
            [Query.orderDesc("$createdAt")]
        );

        return response.documents.map((msg: MessageDocument): Message => ({
            id: msg.$id,
            name: msg.name,
            email: msg.email,
            message: msg.message,
            createdAt: msg.$createdAt || msg.createdAt,
        }));
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};
