import { Client, Databases } from "appwrite"

export const config  = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB,
    projectCollectionsId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTIONS
}

export const client = new Client()

client.setEndpoint(config.endpoint!).setProject(config.projectId!)

export const databases = new Databases(client)
