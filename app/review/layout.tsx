import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Write a Review",
    description: "Share your experience working with Rajjit Laishram. Your feedback helps in improving IoT services and web development solutions.",
};

export default function ReviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
