"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";
import { StarRating } from "@/components/ui/star-rating";
import { addReview } from "@/lib/addReview";
import { MagneticButton } from "@/components/ui/magnetic-button";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [fullname, setFullname] = useState("");
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleProfileUpload = (files: File[]) => {
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!file) {
            alert("Please upload a profile image.");
            return;
        }

        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        setIsSubmitting(true);

        try {
            await addReview({
                fullname,
                role_org: role,
                description,
                profile_url: "",
                rating,
            }, file);
            alert("Review added successfully");
            setFullname("");
            setRole("");
            setDescription("");
            setRating(0);
            setFile(null);
            router.push('/');
        } catch (error) {
            console.error("Error adding review", error);
            alert("An error occurred while submitting your review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl w-full mx-auto p-4 md:p-8 shadow-input bg-black font-merriweather">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Write a review for my services
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {"I'd love to hear your thoughts! Let me know how my services helped you and what I can improve."}
            </p>


            <form className="my-8 h-screen" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="profile">Upload a profile</Label>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleProfileUpload} />
                    </div>
                </LabelInputContainer>
                <div className="flex flex-col mt-5 md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="fullname">Name</Label>
                        <Input
                            id="fullname"
                            placeholder="Tomba Laishram"
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="role">Role</Label>
                        <Input
                            id="role"
                            placeholder="UI/UX Designer at XYZ"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="rating">Rating</Label>
                    <StarRating rating={rating} onRatingChange={setRating} className="mt-2" />
                    {rating > 0 && (
                        <p className="text-xs text-neutral-400 mt-1">
                            You rated {rating} star{rating !== 1 ? 's' : ''}
                        </p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="description">Add review</Label>
                    <textarea
                        id="description"
                        placeholder="Please add your review description"
                        rows={5}
                        className={cn(
                            "border-2 w-full p-4 focus-visible:ring-[2px] focus:ring-neutral-600 outline-none resize-none text-sm bg-zinc-800"
                        )}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </LabelInputContainer>

                <MagneticButton className="w-full">
                    <button
                        className={cn(
                            "mt-5 bg-gradient-to-br relative group/btn block w-full text-white h-10 font-medium transition-all duration-200",
                            isSubmitting
                                ? "from-zinc-800 to-zinc-900 cursor-not-allowed opacity-70"
                                : "from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800"
                        )}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Add →"}
                        {!isSubmitting && <BottomGradient />}
                    </button>
                </MagneticButton>
                <div className="pb-10"></div>
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
