import { Metadata } from "next";
import HomeContent from "./components/HomeContent";
import { getProjects } from "@/lib/getProjects";

export const metadata: Metadata = {
  title: "Rajjit Laishram | IoT Software Developer",
  description: "IoT Software Developer & Hardware Integrator based in Manipur. Building smart homes, innovative IoT solutions, and modern web applications with Next.js and MQTT.",
};

export default async function page() {
  const projects = await getProjects();
  return <HomeContent initialProjects={projects} />;
}