import { Metadata } from "next";
import HomeContent from "./components/HomeContent";
import { getProjects } from "@/lib/getProjects";

export const metadata: Metadata = {
  title: "Rajjit Laishram | IoT & Autonomous Systems Developer",
  description: "IoT Software Developer and Autonomous Systems Engineer based in Manipur. Building the software layer between hardware and intelligent decision systems — LoRaWAN, Edge AI, Drone Systems, MCP/Ollama.",
};

export default async function page() {
  const projects = await getProjects();
  return <HomeContent initialProjects={projects} />;
}