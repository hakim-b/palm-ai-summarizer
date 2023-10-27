import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PaLM AI Text Summarizer",
  description: "Built using Next.js, Shadcn UI and Firebase",
  keywords: ["PalM", "PaLM 2", "PaLM AI", "AI Summarizer", "Text Summarizer"],
};

const openSans = Open_Sans({ weight: "400", subsets: ["latin"] });

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
