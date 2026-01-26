import { config, resumeBucket } from "@/config/appwrite";
import { ID } from "appwrite";

export const updateResume = async (file: File) => {
    if (!config.resumeBucketId) {
        throw new Error("Resume Bucket ID is not defined");
    }

    try {
        // Option 1: Try to delete the old file if we have the ID
        if (config.resumeFileId) {
            try {
                await resumeBucket.deleteFile(config.resumeBucketId, config.resumeFileId);
            } catch (error) {
                console.warn("Could not delete old resume file, it might not exist", error);
            }
        }

        // Option 2: Upload as a new file with a fixed ID if possible, or just a new ID
        // Note: Using the same ID as in config would be ideal if we want to avoid updating env vars.
        // However, if we use a new ID, we should ideally store it somewhere.
        // For now, let's try to use the existing ID from config to replace it.
        const fileId = config.resumeFileId || ID.unique();

        const response = await resumeBucket.createFile(
            config.resumeBucketId,
            fileId,
            file
        );

        return response;
    } catch (error) {
        console.error("Error updating resume:", error);
        throw error;
    }
};
