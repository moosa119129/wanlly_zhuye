import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section with Enhanced Cyberpunk Design */}
            <section className="flex-1 flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_500px]">
                        <div className="flex flex-col justify-center">
                            {/* Logo above title */}
                            <div className="mb-10">
                                <img
                                    src="/lightyear-logo-large.png"
                                    alt="LightYear Algorithm Logo"
                                    className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                                />
                            </div>

                            {/* Title with larger bottom margin */}
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-2xl mb-6 leading-tight whitespace-nowrap">
                                内修算力，外决前程
                            </h1>

                            {/* Description with larger bottom margin */}
                            <p className="max-w-[800px] text-blue-50 text-base md:text-lg lg:text-xl drop-shadow-lg leading-relaxed mb-8 whitespace-nowrap">
                                教育不是博弈，让努力有算法，未来有方向
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4 min-[400px]:flex-row">
                                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50 transition-all">
                                    <Link href="/about">联系我</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="bg-blue-900/40 border-blue-400 text-white hover:bg-blue-800 hover:text-white transition-all shadow-md">
                                    <Link href="/videos">观看视频</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Avatar with soft rounded rectangular border and shadow */}
                        <div className="flex items-center justify-center">
                            <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] group">
                                {/* Soft glow/shadow behind */}
                                <div className="absolute inset-4 bg-blue-600/20 blur-3xl rounded-[2.5rem] group-hover:bg-blue-600/30 transition-all duration-500" />

                                {/* Image container with border and shadow */}
                                <div className="relative w-full h-full transition-all duration-500 group-hover:scale-[1.02]">
                                    <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] pointer-events-none z-20" />
                                    <img
                                        src="/cover.png"
                                        alt="Cover Image"
                                        className="object-cover w-full h-full rounded-[2rem] shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </section >
        </div >
    );
}
