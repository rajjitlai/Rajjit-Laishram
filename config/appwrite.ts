import { Client, Databases, Storage } from "appwrite"

export const config  = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB,
    projectCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTIONS,
    messagesCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTIONS,
    testimonialCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIAL_COLLECTIONS,
    profileImagesBucketId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_TESTI_PROFILE_BUCKET,
    resumeBucketId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_RESUME_BUCKET
}

export const client = new Client()

export const imageBucket = new Storage(client)

client.setEndpoint(config.endpoint!).setProject(config.projectId!)

export const databases = new Databases(client)
