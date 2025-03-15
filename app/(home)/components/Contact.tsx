"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";
import { addMessage } from "@/lib/addMessage";

export function Contact() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted", { firstname, lastname, email, message });

        try {
            await addMessage({ firstname, lastname, email, message });
            alert("Message sent successfully!");
            setFirstname("");
            setLastname("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="py-10 p-5 sm:p-0 font-merriweather mt-20" id="contact">
            <Title text="Contact 📞" className="flex flex-col items-center justify-center cursor-pointer" />
            <div className="max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-10">
                <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
                    {"If you're interested in working together, please fill out this form. I'll get back to you shortly."}
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First name</Label>
                            <Input id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Tomba" type="text" required />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last name</Label>
                            <Input id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Laishram" type="text" required />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="myemail@gmail.com" type="email" required />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="message">Message</Label>
                        <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's your idea?" required />
                    </LabelInputContainer>

                    <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-lg"
                        type="submit">
                        Send
                        <BottomGradient />
                    </button>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
    </div>
);
