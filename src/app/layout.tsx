import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import ogImg from "./opengraph-image.png";

export const metadata: Metadata = {
  title: "PaLM AI Text Summarizer",
  description: "Summarize your text using PaLM!",
  metadataBase: new URL("https://palm-ai-summarizer-6f2b5.web.app/"),
  keywords: ["PalM", "PaLM 2", "PaLM AI", "AI Summarizer", "Text Summarizer"],
  openGraph: {
    title: "PaLM AI Text Summarizer",
    description:
      "An AI summarizer app built with Next.js, Shadcn UI and Firebase",
    images: [{ url: ogImg.src }],
  },
};

const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-open-sans",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${openSans.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
