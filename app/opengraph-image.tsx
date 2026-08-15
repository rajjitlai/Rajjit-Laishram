import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Rajjit Laishram - Project Assistant & Autonomous Systems Developer";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#050505",
                    backgroundImage: `
                        radial-gradient(circle at 25px 25px, rgba(56, 255, 66, 0.15) 2%, transparent 0%),
                        radial-gradient(circle at 75px 75px, rgba(0, 253, 190, 0.08) 2%, transparent 0%)
                    `,
                    backgroundSize: "100px 100px",
                    padding: "60px 70px",
                    fontFamily: "monospace",
                    position: "relative",
                    border: "2px solid rgba(56, 255, 66, 0.4)",
                }}
            >
                {/* HUD Corner Brackets */}
                <div style={{ position: "absolute", top: 20, left: 20, width: 30, height: 30, borderTop: "4px solid #38ff42", borderLeft: "4px solid #38ff42" }} />
                <div style={{ position: "absolute", top: 20, right: 20, width: 30, height: 30, borderTop: "4px solid #00fdbe", borderRight: "4px solid #00fdbe" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, width: 30, height: 30, borderBottom: "4px solid #00fdbe", borderLeft: "4px solid #00fdbe" }} />
                <div style={{ position: "absolute", bottom: 20, right: 20, width: 30, height: 30, borderBottom: "4px solid #38ff42", borderRight: "4px solid #38ff42" }} />

                {/* Top Section */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#38ff42" }} />
                        <span style={{ fontSize: "18px", color: "#38ff42", fontWeight: "bold", letterSpacing: "3px" }}>
                            SYS_CORE // RJ_PORTFOLIO_V2.6
                        </span>
                    </div>
                    <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>
                        IMPHAL, MANIPUR [IN]
                    </span>
                </div>

                {/* Main Headline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h1
                        style={{
                            fontSize: "64px",
                            fontWeight: 900,
                            color: "#ffffff",
                            margin: 0,
                            letterSpacing: "-1px",
                            lineHeight: 1.1,
                        }}
                    >
                        RAJJIT LAISHRAM
                    </h1>
                    <div
                        style={{
                            fontSize: "26px",
                            fontWeight: 700,
                            color: "#38ff42",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Project Assistant @ NIELIT Imphal (Drone Electronics Lab)
                    </div>
                    <p
                        style={{
                            fontSize: "20px",
                            color: "rgba(255, 255, 255, 0.7)",
                            margin: 0,
                            lineHeight: 1.4,
                            maxWidth: "950px",
                        }}
                    >
                        Autonomous Drone Stacks · Custom GCS · AI Integration Pipelines · Edge AI & IoT
                    </p>
                </div>

                {/* Badges / Metrics Row */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {[
                        "215+ Flight Tests",
                        "Custom GCS Stacks",
                        "MAVLink & DroneKit",
                        "LoRaWAN & Edge AI",
                        "9.3 BCA CGPA",
                    ].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: "8px 18px",
                                backgroundColor: "rgba(56, 255, 66, 0.1)",
                                border: "1px solid rgba(56, 255, 66, 0.3)",
                                borderRadius: "8px",
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                {/* Footer Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "18px" }}>
                    <span style={{ color: "#00fdbe", fontSize: "16px", fontWeight: "bold" }}>
                        https://rajjitlaishram.netlify.app
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
                        Agentic SEO & LLM Ready (llms.txt)
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
