"use client";
import { motion } from "framer-motion";

export const ScrollReveal = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // Custom Quintic easeOut
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
