import type { Metadata } from "next";
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Inter } from "next/font/google";
import "./globals.css";
import { homeFrame, homeOpenGraph } from "@/lib/frames";

const inter = Inter({ subsets: ["latin"] });

const frameMetadata = getFrameMetadata(homeFrame);

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: "Match X",
  description: "Expand Platforms, Amplify Voices, Enhance Freedom.",
  other: {
    ...frameMetadata
  },
  openGraph: homeOpenGraph,
  twitter: { ...homeOpenGraph, card: "summary_large_image" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
