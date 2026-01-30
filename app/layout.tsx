import type { Metadata, Viewport } from "next";
import { Playwrite_IT_Moderna, Merriweather_Sans, Noto_Sans_Meetei_Mayek, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { BackToTop } from "@/components/BackToTop";

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
    default: "Rajjit Laishram | IoT Software Developer",
    template: "%s | Rajjit Laishram"
  },
  description: "IoT Software Developer & Hardware Integrator based in Manipur. Building smart homes, innovative IoT solutions, and modern web applications with Next.js and MQTT.",
  keywords: [
    "Rajjit Laishram", "IoT Developer", "Software Engineer",
    "React", "Next.js", "Node.js", "Appwrite", "Firebase",
    "IoT", "MQTT", "ESP32", "Arduino", "Smart Home",
    "Manipur", "India", "Web Development"
  ],
  authors: [{ name: "Rajjit Laishram", url: "https://rajjitlaishram.netlify.app" }],
  creator: "Rajjit Laishram",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajjitlaishram.netlify.app",
    title: "Rajjit Laishram | IoT Software Developer",
    description: "Building the future of smart living through code. Expert in IoT integrations, modern web apps, and hardware communication.",
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
    title: "Rajjit Laishram | IoT Software Developer",
    description: "IoT Software Developer & Hardware Integrator based in Manipur. Building smart homes and innovative IoT solutions.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-J2FMJLG89T"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J2FMJLG89T', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${playwrite.variable} ${merriweather.variable} ${meitei.variable} ${outfit.variable} antialiased`}
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
            {children}
            <BackToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
