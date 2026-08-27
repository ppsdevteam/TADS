import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TA Drug Store | Healthcare Distribution in Jordan",
  description:
    "TA Drug Store is a market access and healthcare distribution partner based in Amman, Jordan.",
  keywords: [
    "TA Drug Store",
    "Taaluf Alkhair Drug Store",
    "healthcare distribution Jordan",
    "pharmaceutical distribution Amman",
    "market access Jordan",
  ],
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/ta-logo-green.png",
    shortcut: "/assets/ta-logo-green.png",
  },
  openGraph: {
    title: "TA Drug Store",
    description:
      "Building brands and expanding healthcare access across Jordan.",
    type: "website",
    images: [
      {
        url: "/assets/tads-building-closed-doors-v7.webp",
        width: 1448,
        height: 1086,
        alt: "Taaluf Alkhair Drug Store headquarters in Amman",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} antialiased`}>{children}</body>
    </html>
  );
}
