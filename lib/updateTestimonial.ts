import { config, databases } from "@/config/appwrite";

interface TestimonialUpdateData {
    approved?: boolean;
    fullname?: string;
    role_org?: string;
    description?: string;
}

export const updateTestimonial = async (
    testimonialId: string,
    data: TestimonialUpdateData
): Promise<void> => {
    try {
        if (!config.databaseId || !config.testimonialCollectionsId) {
            throw new Error("Database ID or Testimonial Collection ID is not defined");
        }

        await databases.updateDocument(
            config.databaseId,
            config.testimonialCollectionsId,
            testimonialId,
            data
        );
    } catch (error) {
        console.error("Error updating testimonial:", error);
        throw error;
    }
};
