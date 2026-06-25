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
    default: "Rajjit Laishram | IoT & Autonomous Systems Developer",
    template: "%s | Rajjit Laishram"
  },
  description: "IoT Software Developer and Autonomous Systems Engineer based in Manipur. Building the software layer between hardware and intelligent decision systems — LoRaWAN, Edge AI, Drone Systems, MCP/Ollama.",
  keywords: [
    "Rajjit Laishram", "IoT Developer", "Autonomous Systems",
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
    title: "Rajjit Laishram | IoT & Autonomous Systems Developer",
    description: "IoT Software Developer and Autonomous Systems Engineer based in Manipur. Building the software layer between hardware and intelligent decision systems — LoRaWAN, Edge AI, Drone Systems, MCP/Ollama.",
    siteName: "Rajjit Laishram Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rajjit Laishram - IoT Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajjit Laishram | IoT & Autonomous Systems Developer",
    description: "IoT Software Developer and Autonomous Systems Engineer based in Manipur. Building the software layer between hardware and intelligent decision systems — LoRaWAN, Edge AI, Drone Systems, MCP/Ollama.",
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
  "@type": "Person",
  "name": "Rajjit Laishram",
  "url": "https://rajjitlaishram.netlify.app",
  "jobTitle": "IoT Software Developer",
  "sameAs": [
    "https://www.linkedin.com/in/rajjitlaishram/",
    "https://github.com/rajjitlai/",
    "https://instagram.com/rajjitlaishram",
    "https://facebook.com/rajjitlaishram"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Manipur",
    "addressCountry": "IN"
  }
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
