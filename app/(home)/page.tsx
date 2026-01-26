import { Metadata } from "next";
import HomeContent from "./components/HomeContent";

export const metadata: Metadata = {
  title: "Rajjit Laishram | IoT Software Developer",
  description: "IoT Software Developer & Hardware Integrator based in Manipur. Building smart homes, innovative IoT solutions, and modern web applications with Next.js and MQTT.",
};

export default function page() {
  return <HomeContent />;
}