import { config, databases } from "@/config/appwrite";
import { Models, Query } from "appwrite";

interface Document extends Models.Document {
    fullname: string;
    role_org: string;
    description: string;
    profile_url: string;
    approved?: boolean;
}

interface Testimonial {
    id: string;
    name: string;
    role: string;
    description: string;
    image_url: string;
    approved?: boolean;
}

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
    try {
        if (!config.databaseId || !config.testimonialCollectionsId) {
            throw new Error("Database ID or Testimonial Collection ID is not defined");
        }

        const response = await databases.listDocuments<Document>(
            config.databaseId,
            config.testimonialCollectionsId,
        );

        return response.documents.map((testimonial: Document): Testimonial => ({
            id: testimonial.$id,
            name: testimonial.fullname,
            role: testimonial.role_org,
            description: testimonial.description,
            image_url: testimonial.profile_url,
            approved: testimonial.approved,
        }));
    } catch (error) {
        console.error("Error fetching all testimonials", error);
        return [];
    }
};
