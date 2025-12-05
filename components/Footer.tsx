import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 w-full z-40 bg-background/80 backdrop-blur-md border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 LightYear Algorithm. 版权所有.
                </p>
            </div>
        </footer>
    );
}
