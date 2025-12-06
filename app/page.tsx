import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section with Enhanced Cyberpunk Design */}
            <section className="flex-1 flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
                <div className="container max-w-screen-2xl px-4 md:px-8 relative z-10">
                    <div className="flex flex-col items-start text-left max-w-2xl mt-32 lg:mt-60">
                        {/* Logo above title */}
                        <div className="mb-10">
                            <img
                                src="/lightyear-logo-large.png"
                                alt="LightYear Algorithm Logo"
                                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                            />
                        </div>

                        {/* Title with larger bottom margin */}
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-2xl mb-8 leading-tight">
                            内修算力，外决前程
                        </h1>

                        {/* Description with larger bottom margin */}
                        <p className="max-w-[600px] text-blue-50 text-base md:text-lg lg:text-xl drop-shadow-lg leading-relaxed mb-10">
                            教育不是博弈，让努力有算法，未来有方向
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-start">
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50 transition-all">
                                <Link href="/about">联系我</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-blue-900/40 border-blue-400 text-white hover:bg-blue-800 hover:text-white transition-all shadow-md">
                                <Link href="/content">精品内容</Link>
                            </Button>
                        </div>
                    </div >
                </div >
            </section >
        </div >
    );
}
