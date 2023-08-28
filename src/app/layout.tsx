import { RootLayoutProps } from "@/types";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "PaLM AI Text Summarizer",
  description: "Built using Next.js, Shadcn UI and Firebase",
};

const openSans = Open_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
