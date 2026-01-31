import { useState, useEffect } from 'react';
import { SECTIONS } from '../constants';

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        SECTIONS.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return activeSection;
};
