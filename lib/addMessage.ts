import { config,databases } from "@/config/appwrite"
import { ID } from "appwrite"

interface Message {
    firstname: string;
    lastname: string;
    email: string;
    message: string;
}

type Response = unknown;

export const addMessage = async (msg: Message): Promise<Response> => {
    const documentId = ID.unique();
    try {
        const response: Response = await databases.createDocument(config.databaseId!, config.messagesCollectionsId!, documentId!, {
            firstname: msg.firstname,
            lastname: msg.lastname,
            email: msg.email,
            message: msg.message,
        });

        return response;
    } catch (error) {
        console.error("Error adding message: ", error);
        throw error;
    }
}