import { config, databases, imageBucket } from "@/config/appwrite";
import { ID } from "appwrite";

interface Review {
    fullname: string;
    role_org: string;
    description: string;
    profile_url: string;
}

type Response = unknown;

export const addReview = async (rev: Review, file: File): Promise<Response> => {
    const documentId = ID.unique();
    try {
        if (!config.databaseId ||!config.testimonialCollectionsId || !config.profileImagesBucketId) {
            throw new Error("Database ID or Message Collection ID is not defined");
        }
        const fileResponse = await imageBucket.createFile(
            config.profileImagesBucketId,
            ID.unique(),
            file
        );

        const fileId = fileResponse.$id;
        const imageUrl = imageBucket.getFileView(config.profileImagesBucketId, fileId)

        const response: Response = await databases.createDocument(
            config.databaseId!,
            config.testimonialCollectionsId!,
            documentId,
            {
                fullname: rev.fullname,
                role_org: rev.role_org,
                description: rev.description,
                profile_url: imageUrl,
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding review: ", error);
        throw error;
    }
};
