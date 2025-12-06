import { PODCASTS } from "@/lib/static-data";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
    return PODCASTS.map((podcast) => ({
        id: podcast.id.toString()
    }))
}

interface PodcastPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function PodcastDetailPage({ params }: PodcastPageProps) {
    const { id } = await params
    const podcast = PODCASTS.find(p => p.id === parseInt(id))

    if (!podcast) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title={podcast.title}
                description={podcast.description}
            />
            <div className="container max-w-4xl py-12 px-4 md:px-6">
                {/* 返回按钮 */}
                <Link href="/content" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    返回精品内容
                </Link>

                {/* 播客信息 */}
                <div className="flex items-center gap-4 mb-8">
                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
                        播客
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {podcast.duration}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {new Date(podcast.publishedAt).toLocaleDateString('zh-CN')}
                    </span>
                </div>

                {/* 播客封面和播放入口 */}
                <div className="flex flex-col items-center mb-8">
                    <a
                        href={podcast.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-square w-full max-w-md rounded-xl overflow-hidden bg-gradient-to-br from-orange-900/20 to-slate-900 relative group"
                    >
                        <img
                            src={podcast.coverImage}
                            alt={podcast.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </a>
                    <p className="text-sm text-muted-foreground mt-4 text-center">点击封面在小宇宙中收听</p>
                </div>

                {/* 在小宇宙中打开 */}
                <div className="flex justify-center">
                    <Button asChild variant="outline" className="gap-2">
                        <a href={podcast.linkUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            在小宇宙中打开
                        </a>
                    </Button>
                </div>

                {/* 播客介绍 */}
                <div className="mt-12 p-6 rounded-xl bg-card/50 border border-border/50">
                    <h2 className="text-xl font-semibold mb-4">关于本期节目</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {podcast.description}
                    </p>
                </div>

                {/* 订阅提示 */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                    <h3 className="text-lg font-semibold mb-2">🎧 订阅「即将抵达」播客</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        在小宇宙App中搜索「即将抵达」或「家长会客厅」，订阅获取最新节目更新。
                    </p>
                    <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600">
                        <a href="https://www.xiaoyuzhoufm.com/podcast/6682128ecdd230b23b55d740" target="_blank" rel="noopener noreferrer">
                            前往订阅
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
