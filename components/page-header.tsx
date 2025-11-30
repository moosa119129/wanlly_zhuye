import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    backgroundImage?: string;
    className?: string;
    children?: React.ReactNode;
}

export function PageHeader({
    title,
    description,
    backgroundImage,
    className,
    children,
}: PageHeaderProps) {
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            {/* Cyberpunk Blue Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="h-full w-full bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900" />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse" />
                {/* Grid pattern for cyberpunk effect */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 flex flex-col items-center justify-center py-20 text-center md:py-32">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-6 max-w-2xl text-lg text-blue-100 md:text-xl drop-shadow-lg">
                        {description}
                    </p>
                )}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </div>
    );
}
