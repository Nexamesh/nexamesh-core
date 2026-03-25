import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import * as React from "react";
import { Analytics } from "../components/Analytics";
import { SkipNav } from "../components/SkipNav";
import { ThemeProvider } from "../contexts/ThemeContext";
import { CartProvider } from "../contexts/CartContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexaMesh — Connected Intelligence Infrastructure",
  description:
    "Counter-UAS edge intelligence platform. Sub-200ms detection, RF-denied autonomy, blockchain-anchored evidence. Kestrel Mesh deployable sensing + Sentinel Ring perimeter awareness.",
  keywords: [
    "counter-drone",
    "counter-UAS",
    "C-UAS",
    "drone detection",
    "edge AI",
    "RF-denied",
    "autonomous defense",
    "mesh networking",
    "perimeter security",
    "NexaMesh",
  ],
  authors: [{ name: "NexaMesh" }],
  creator: "NexaMesh",
  publisher: "NexaMesh",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nexamesh.ai",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NexaMesh — Connected Intelligence Infrastructure",
    description:
      "Counter-UAS edge intelligence. Sub-200ms detection, RF-denied autonomy, blockchain evidence anchoring.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://nexamesh.ai",
    siteName: "NexaMesh",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "NexaMesh — Connected Intelligence Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaMesh — Connected Intelligence Infrastructure",
    description:
      "Counter-UAS edge intelligence. Sub-200ms detection in RF-denied environments.",
    images: ["/logo.svg"],
    creator: "@nexamesh_ai",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Analytics />
        <SkipNav />
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
