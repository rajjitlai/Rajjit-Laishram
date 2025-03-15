"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";

export default function page() {
    const [profile, setProfile] = useState<Profile[]>([])

    const handleProfileUpload = (files: Profile[]) => {
        setProfile(profile)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className="flex justify-center items-center flex-col h-screen max-w-xl w-full mx-auto p-4 md:p-8 shadow-input bg-black font-merriweather">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Write a review for my services
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {"I'd love to hear your thoughts! Let me know how my services helped you and what I can improve."}
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleProfileUpload} />
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="fullname">Name</Label>
                        <Input id="fullname" placeholder="Tomba Laishram" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="UI/UX Designer at XYZ" type="text" />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer>
                    <Label htmlFor="description">Add review</Label>
                    <textarea
                        id="description"
                        placeholder="Please add your review description"
                        rows={5}
                        className={cn(
                            "border-2 w-full p-4 focus-visible:ring-[2px] focus:ring-neutral-600 outline-none resize-none text-sm bg-zinc-800"
                        )}
                        required
                    />
                </LabelInputContainer>

                <button
                    className="mt-5 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Add &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-hers to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-mine to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
