import { config, databases } from "@/config/appwrite";

export const deleteTestimonial = async (testimonialId: string): Promise<void> => {
    try {
        if (!config.databaseId || !config.testimonialCollectionsId) {
            throw new Error("Database ID or Testimonial Collection ID is not defined");
        }

        await databases.deleteDocument(
            config.databaseId,
            config.testimonialCollectionsId,
            testimonialId
        );
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        throw error;
    }
};
