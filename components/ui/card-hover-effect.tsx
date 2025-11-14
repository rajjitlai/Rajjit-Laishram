import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { IconType } from "react-icons";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        text: string;
        Icon: IconType
    }[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const moveGlow = () => {
            const newX = Math.random() * 100;
            const newY = Math.random() * 100;
            setGlowPosition({ x: newX, y: newY });
        };

        const interval = setInterval(moveGlow, 3000); // Move every 3 seconds
        return () => clearInterval(interval);
    }, []);
    return (
        <div
            className={cn(
                "grid grid-cols-2 py-10",
                className
            )}
        >
            {items.map((item, idx) => {
                const Icon = item.Icon;
                return (
                    <div
                        key={idx}
                        className="relative group  block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-hers/[0.3] block "
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 253, 234, 0.4), rgba(56, 255, 66, 0.2), transparent)`,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <div className="w-ful p-4 overflow-hidden bg-black group-hover:ring-2 ring-green-400 relative z-20 transition-all duration-500 cursor-pointer">
                            <div className="py-10 z-50 relative space-y-5">
                                <Icon className="w-8 h-8 mx-auto" />
                                <p className="text-2xl font-bold text-center text-gray-300">{item.text}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
