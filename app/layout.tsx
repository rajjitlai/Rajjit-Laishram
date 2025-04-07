import type { Metadata } from "next";
import { Playwrite_IT_Moderna, Merriweather_Sans, Noto_Sans_Meetei_Mayek } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const playwrite = Playwrite_IT_Moderna({
  variable: "--font-playwrite",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rajjitlaishram.netlify.app/"),
  title: "Rajjit Laishram",
  authors: {
    name: "Rajjit Laishram",
    url: "https://rajjitlaishram.netlify.app",
  },
  description: "Based in Manipur, I'm a dedicated Full-Stack Developer x Software and Autonomous Systems Developer with a passion for creating innovative solutions that bridge the gap between software and hardware.",
  twitter: {
    site: "@rajjitlai",
  },
  openGraph: {
    "title": "Rajjit Laishram",
    description: "Based in Manipur, I'm a dedicated Full-Stack Developer x Software and Autonomous Systems Developer with a passion for creating innovative solutions that bridge the gap between software and hardware.",
    url: "https://rajjitlaishram.netlify.app",
    siteName: "Rajjit Laishram",
    images: "/og.png",
    type: "website",
  },
  keywords: ["rajjit laishram", "portfolio", "next js", "tailwind css", "aceternity ui"],
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
          src="https://www.googletagmanager.com/gtag/js?id=G-HDYCTV3EVL"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HDYCTV3EVL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${playwrite.variable} ${merriweather.variable} ${meitei.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
