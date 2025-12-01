import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";



export default async function AILabPage() {
    const demos = await prisma.appDemo.findMany({
        orderBy: { id: 'desc' }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="🧪 AI 与工具实验室"
                description="这里展示了我正在开发的 AI 轻应用和实验项目。"
            />
            <div className="container py-12 px-4 md:px-6">
                <div className="flex flex-wrap justify-center gap-6">
                    {demos.map((demo) => (
                        <Link key={demo.id} href={demo.linkUrl} target="_blank" className="w-full max-w-sm">
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                                <div className="aspect-video bg-muted relative">
                                    {demo.coverImage ? (
                                        <img src={demo.coverImage} alt={demo.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/50">
                                            {demo.title}
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        {demo.status === 'Live' ? (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                                                在线演示
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                                                开发中
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{demo.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{demo.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>

                {demos.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>实验室正在装修中,敬请期待...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
