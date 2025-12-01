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
            {/* Professional Education Tech Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="h-full w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />
                {/* Subtle animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent opacity-50" />
                {/* Clean grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                                          linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 flex flex-col items-center justify-center py-12 text-center md:py-20">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 max-w-2xl text-base text-blue-50 md:text-lg drop-shadow-md">
                        {description}
                    </p>
                )}
                {children && <div className="mt-6">{children}</div>}
            </div>
        </div>
    );
}
