import { account } from "@/config/appwrite";
import { ID } from "appwrite";

export async function login(email: string, pass: string) {
    try {
        const session = await account.createEmailPasswordSession(email, pass);
        return session;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error("Get User Error:", error);
        return null; // Return null if not logged in
    }
}
