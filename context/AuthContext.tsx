"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser, login, logout } from "@/lib/auth";
import { Models } from "appwrite";

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    isAdmin: boolean;
    loginUser: (email: string, pass: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                // Strict Admin Check
                // Only allow the specific email to be considered an admin
                // You should probably put this in an environment variable in a real app, 
                // but for a personal portfolio, this is acceptable if source isn't public.
                // Better yet, use NEXT_PUBLIC_ADMIN_EMAIL
                const adminEmail = "rajjitlaishram@gmail.com"; // Replace with your actual admin email
                if (currentUser.email === adminEmail || currentUser.labels?.includes("admin")) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Auth Check Error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (email: string, pass: string) => {
        setLoading(true);
        try {
            await login(email, pass);
            await checkUser();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
