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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased flex flex-col",
                    inter.variable
                )}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
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
