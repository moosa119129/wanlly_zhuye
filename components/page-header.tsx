import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    backgroundImage?: string;
    className?: string;
    children?: React.ReactNode;
    align?: 'left' | 'center';
}

export function PageHeader({
    title,
    description,
    backgroundImage,
    className,
    children,
    align = 'center',
}: PageHeaderProps) {
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            {/* Content */}
            <div className={cn(
                "container relative z-10 flex flex-col justify-center py-12 md:py-20",
                align === 'center' ? "items-center text-center" : "items-start text-left"
            )}>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-xl">
                    {title}
                </h1>
                {description && (
                    <p className={cn(
                        "mt-4 max-w-2xl text-base text-blue-50 md:text-lg drop-shadow-md",
                        align === 'left' && "max-w-3xl"
                    )}>
                        {description}
                    </p>
                )}
                {children && <div className="mt-6">{children}</div>}
            </div>
        </div>
    );
}
