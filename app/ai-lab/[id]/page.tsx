import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/app/actions";

export default async function AILabDetailPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const demo = await prisma.appDemo.findUnique({
        where: { id }
    });

    if (!demo) notFound();

    return (
        <div className="container py-12 px-4 md:px-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tighter mb-2">{demo.title}</h1>
                <div className="flex items-center gap-2 mb-4">
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
                <p className="text-lg text-muted-foreground">{demo.description}</p>
            </div>

            {/* App Demo Placeholder */}
            <div className="aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center mb-12">
                <div className="text-muted-foreground text-xl font-medium mb-2">应用演示区</div>
                <p className="text-muted-foreground/80">应用加载中...</p>
            </div>

            {/* Waitlist Form */}
            <div className="bg-card rounded-xl p-8 border shadow-sm">
                <h2 className="text-2xl font-bold mb-4">加入等待名单</h2>
                <p className="text-muted-foreground mb-6">
                    对这个项目感兴趣？留下您的邮箱，我们将在有新进展时第一时间通知您。
                </p>
                <form action={joinWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-md">
                    <input type="hidden" name="demoId" value={demo.id} />
                    <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        className="flex-1"
                    />
                    <Button type="submit">提交</Button>
                </form>
            </div>
        </div>
    );
}
