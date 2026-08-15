import type { Metadata, Viewport } from "next";
import { Playwrite_IT_Moderna, Merriweather_Sans, Noto_Sans_Meetei_Mayek, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";

const playwrite = Playwrite_IT_Moderna({
  variable: "--font-playwrite",
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ['latin'],
})

const merriweather = Merriweather_Sans({
  variable: "--font-merriweather",
  subsets: ['latin'],
  preload: true,
})

const meitei = Noto_Sans_Meetei_Mayek({
  variable: "--font-meitei",
  subsets: ['latin'],
  preload: true,
})

export const viewport: Viewport = {
  themeColor: "#38ff42",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://rajjitlaishram.netlify.app/"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Rajjit Laishram | Drone & Autonomous Systems Developer",
    template: "%s | Rajjit Laishram"
  },
  description: "Project Assistant at NIELIT Imphal (Drone Electronics Lab) & Autonomous Systems Developer based in Manipur. Building drone software stacks, custom GCS, AI integration pipelines, and intelligent IoT platforms.",
  keywords: [
    "Rajjit Laishram", "Project Assistant", "NIELIT Imphal", "Drone Electronics Lab",
    "Autonomous Systems", "GCS Software", "Drone Scripting", "AI Pipelines",
    "Edge AI", "LoRaWAN", "DroneKit", "MAVLink", "OpenCV",
    "YOLO", "Hailo AI", "MCP", "Ollama", "Raspberry Pi",
    "ESP32", "Manipur", "India", "NIDAR"
  ],
  authors: [{ name: "Rajjit Laishram", url: "https://rajjitlaishram.netlify.app" }],
  creator: "Rajjit Laishram",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajjitlaishram.netlify.app",
    title: "Rajjit Laishram | Drone & Autonomous Systems Developer",
    description: "Project Assistant at NIELIT Imphal (Drone Electronics Lab) & Autonomous Systems Developer based in Manipur. Building drone software stacks, custom GCS, AI integration pipelines, and intelligent IoT platforms.",
    siteName: "Rajjit Laishram Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rajjit Laishram - Drone & Autonomous Systems Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajjit Laishram | Drone & Autonomous Systems Developer",
    description: "Project Assistant at NIELIT Imphal (Drone Electronics Lab) & Autonomous Systems Developer based in Manipur. Building drone software stacks, custom GCS, AI integration pipelines, and intelligent IoT platforms.",
    images: ["/og.png"],
    creator: "@rajjitlai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "zzE-oHc7EoCrDoRmQOoaX9gr_G1I1L5dsRuN9ikYP6w",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rajjitlaishram.netlify.app/#person",
      "name": "Rajjit Laishram",
      "url": "https://rajjitlaishram.netlify.app",
      "jobTitle": "Project Assistant",
      "description": "Project Assistant at NIELIT Imphal (Drone Electronics Lab) and Autonomous Systems Engineer specializing in drone software stacks, custom GCS, AI integration pipelines, and intelligent IoT architectures.",
      "worksFor": {
        "@type": "Organization",
        "name": "NIELIT Imphal",
        "department": "Drone Electronics Lab"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "NIELIT Imphal"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Bachelor of Computer Applications (BCA)",
          "credentialCategory": "degree",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "NIELIT Imphal"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Cyber Security Certification",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "NIELIT Imphal"
          }
        }
      ],
      "knowsAbout": [
        "Drone Software Stacks",
        "Ground Control Station (GCS) Development",
        "Autonomous Flight Routines",
        "AI Integration Pipelines",
        "LoRaWAN & Satellite IoT",
        "Edge AI & Computer Vision",
        "MAVLink & DroneKit",
        "Next.js & TypeScript",
        "Embedded Systems & ESP32"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/rajjitlaishram/",
        "https://github.com/rajjitlai/",
        "https://instagram.com/rajjitlaishram",
        "https://facebook.com/rajjitlaishram"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Imphal, Manipur",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Autonomous Drone System & Custom GCS (NAWA)",
      "applicationCategory": "FlightControlSoftware",
      "operatingSystem": "Linux, Embedded, Windows",
      "author": { "@id": "https://rajjitlaishram.netlify.app/#person" },
      "description": "Complete autonomous drone software stack from scratch featuring custom Electron GCS, YOLO AI survivor detection, RTSP/MJPEG streaming, and multi-drone coordination."
    },
    {
      "@type": "ProfilePage",
      "@id": "https://rajjitlaishram.netlify.app/#webpage",
      "url": "https://rajjitlaishram.netlify.app",
      "name": "Rajjit Laishram | Project Assistant & Autonomous Systems Developer",
      "mainEntity": { "@id": "https://rajjitlaishram.netlify.app/#person" },
      "hasPart": [
        {
          "@type": "DigitalDocument",
          "name": "Profile Raw Data JSON",
          "url": "https://rajjitlaishram.netlify.app/data.json",
          "encodingFormat": "application/json"
        },
        {
          "@type": "DigitalDocument",
          "name": "LLM Summary Specification",
          "url": "https://rajjitlaishram.netlify.app/llms.txt",
          "encodingFormat": "text/plain"
        },
        {
          "@type": "DigitalDocument",
          "name": "AI Agent Discovery Manifest",
          "url": "https://rajjitlaishram.netlify.app/.well-known/agent.json",
          "encodingFormat": "application/json"
        }
      ]
    }
  ]
};

import { GlobalClientComponents } from "@/components/GlobalClientComponents";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="relative" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BX29NE2TKJ"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BX29NE2TKJ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${playwrite.variable} ${merriweather.variable} ${meitei.variable} ${outfit.variable} antialiased relative`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <GlobalClientComponents />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
