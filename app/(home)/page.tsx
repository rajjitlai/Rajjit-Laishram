import { Metadata } from "next";
import HomeContent from "./components/HomeContent";
import { getProjects } from "@/lib/getProjects";

export const metadata: Metadata = {
  title: "Rajjit Laishram | Drone & Autonomous Systems Engineer",
  description: "Project Assistant at NIELIT Imphal (Drone Electronics Lab) & Autonomous Systems Developer based in Manipur. Building drone software stacks, custom GCS, AI integration pipelines, and intelligent IoT platforms.",
};

export default async function page() {
  const projects = await getProjects();
  return <HomeContent initialProjects={projects} />;
}