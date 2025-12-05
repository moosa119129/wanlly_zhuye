import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Personal Brand Website",
    description: "Knowledge Blogger Personal Website",
    icons: {
        icon: '/mm_dad_logo.jpg',
    },
};

import { ThemeProvider } from "@/components/theme-provider"

// ... imports

import GlobalBackground from "@/components/GlobalBackground";

// ... imports

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen font-sans antialiased flex flex-col bg-slate-950 text-slate-100 selection:bg-yellow-400 selection:text-slate-900",
                    inter.variable
                )}
                suppressHydrationWarning
            >
                <GlobalBackground />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main className="flex-1 pb-24">{children}</main>
                    <Footer />
                    <ChatWidget />
                </ThemeProvider>
            </body>
        </html>
    );
}
