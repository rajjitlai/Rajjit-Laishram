'use client';

import { Client, Databases, Storage, Account } from "appwrite"

export const config = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB,
    projectCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTIONS,
    messagesCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTIONS,
    testimonialCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIAL_COLLECTIONS,
    profileImagesBucketId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_TESTI_PROFILE_BUCKET,
    resumeBucketId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_RESUME_BUCKET,
    resumeFileId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_RESUME_FILE_ID
}

const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.projectId!);

export const databases = new Databases(client);
export const imageBucket = new Storage(client);
export const resumeBucket = new Storage(client);
export const account = new Account(client);
export { client };
