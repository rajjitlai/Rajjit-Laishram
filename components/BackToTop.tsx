"use client";
import React, { useState, useEffect } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed bottom-10 right-10 z-50"
                >
                    <span className="absolute inset-0 rounded-full bg-mine/50 animate-ping"></span>
                    <button
                        onClick={scrollToTop}
                        className="relative p-3 bg-black dark:bg-zinc-800 border border-zinc-700 rounded-full shadow-xl hover:scale-110 transition-transform group"
                        aria-label="Back to Top"
                    >
                        <IconArrowUp className="w-6 h-6 text-white group-hover:text-mine transition-colors" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
