"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface DecryptedTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className, speed = 50, delay = 0 }) => {
    const [displayText, setDisplayText] = useState("");
    const [hasMounted, setHasMounted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAnimation = useCallback(() => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, speed);
    }, [text, speed]);

    useEffect(() => {
        setHasMounted(true);
        const timeout = setTimeout(() => {
            startAnimation();
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [delay, startAnimation]);

    return <span className={className}>{(!hasMounted) ? text : (displayText || text.split("").map(() => " ").join(""))}</span>;
};
