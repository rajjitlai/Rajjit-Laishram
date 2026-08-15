import { NextRequest, NextResponse } from "next/server";
import profileData from "@/lib/data.json";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section")?.toLowerCase();

    let responseData: unknown = profileData;

    if (section) {
        if (section === "experience") {
            responseData = { experience: profileData.experience };
        } else if (section === "skills") {
            responseData = { skills: profileData.skills };
        } else if (section === "contact") {
            responseData = { contact: profileData.contact };
        } else if (section === "basics" || section === "bio" || section === "role") {
            responseData = { basics: profileData.basics };
        } else if (section === "projects") {
            responseData = {
                projects: [
                    {
                        name: "Autonomous Drone System (NAWA)",
                        role: "Lead Software Engineer",
                        details: "Custom GCS, YOLO AI detection, RTSP/MJPEG streaming, 215+ flights",
                        award: "NIDAR Disaster Management Exceptional Journey Winner"
                    },
                    {
                        name: "NIELIT Imphal Drone Electronics Lab",
                        role: "Project Assistant",
                        period: "July 2026 – Present",
                        details: "Custom GCS software, drone scripting, AI pipelines, autonomous flight routines"
                    },
                    {
                        name: "IoT Monitoring Infrastructure (Nibiaa)",
                        role: "IoT Software Developer",
                        details: "Hybrid LoRaWAN/Satellite tracking, offline MCP + Ollama AI, geofencing"
                    }
                ]
            };
        }
    }

    return NextResponse.json(responseData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
            "Content-Type": "application/json",
        },
    });
}

