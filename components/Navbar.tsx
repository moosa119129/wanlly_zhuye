"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { name: "首页", href: "/" },
    { name: "关于我们", href: "/company" },
    { name: "精品内容", href: "/content" },
    { name: "AI工具", href: "/ai-lab" },
    { name: "精品课程", href: "/courses" },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <img src="/book-logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                        <span className="hidden font-bold sm:inline-block">
                            LightYear Algorithm
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors hover:text-foreground/80 ${pathname === item.href ? "text-foreground font-bold" : "text-foreground/60"}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    {isHomePage && (
                        <>
                            <ModeToggle />
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/articles">📝 文章管理</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
