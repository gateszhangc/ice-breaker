import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ice Breaker Games - Team Building & Social Activities",
    template: "%s | Ice Breaker Games",
  },
  description:
    "Discover the perfect icebreaker games for team building, online meetings, and social activities. Complete with detailed instructions and step-by-step guides.",
  keywords: [
    "ice breaker games",
    "icebreaker",
    "team building",
    "team activities",
    "interactive games",
    "meeting games",
    "social activities",
  ],
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
