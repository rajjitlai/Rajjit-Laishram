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

function initializeAppwrite() {
    if (typeof window === 'undefined') {
        // Return dummy objects during SSR
        return {
            client: {} as Client,
            databases: {} as Databases,
            imageBucket: {} as Storage,
            resumeBucket: {} as Storage,
            account: {} as Account,
        };
    }

    const client = new Client();
    client.setEndpoint(config.endpoint!).setProject(config.projectId!);
    const databases = new Databases(client);
    const imageBucket = new Storage(client);
    const resumeBucket = new Storage(client);
    const account = new Account(client);

    return { client, databases, imageBucket, resumeBucket, account };
}

const appwrite = initializeAppwrite();

export const client = appwrite.client;
export const databases = appwrite.databases;
export const imageBucket = appwrite.imageBucket;
export const resumeBucket = appwrite.resumeBucket;
export const account = appwrite.account;
