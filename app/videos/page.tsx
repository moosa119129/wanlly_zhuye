import { PageHeader } from "@/components/page-header";
import { VIDEOS } from "@/lib/static-data";

export default function VideosPage() {
    const videos = VIDEOS

    const depthVideos = videos.filter(v => v.category === '深度解析')
    const learningVideos = videos.filter(v => v.category === '学习力提升')

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="🎬 视频精选"
                description="深度解析与碎片思考,探索知识的多种形态。"
            />
            <div className="container mx-auto px-4 py-12">
                {/* Section 1: Depth Analysis */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 border-l-4 border-primary pl-4">深度解析</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {depthVideos.map((video) => (
                            <a
                                key={video.id}
                                href={`https://www.bilibili.com/video/${video.bvid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
                            >
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    {video.coverImage ? (
                                        <img
                                            src={video.coverImage}
                                            alt={video.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-100">
                                            视频缩略图
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                        {depthVideos.length === 0 && (
                            <p className="text-muted-foreground col-span-full text-center py-8">暂无深度解析视频</p>
                        )}
                    </div>
                </section>

                {/* Section 2: Learning Power */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-500 pl-4">学习力提升</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {learningVideos.map((video) => (
                            <a
                                key={video.id}
                                href={`https://www.bilibili.com/video/${video.bvid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
                            >
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    {video.coverImage ? (
                                        <img
                                            src={video.coverImage}
                                            alt={video.title}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-100">
                                            视频缩略图
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
                                        {video.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                        {learningVideos.length === 0 && (
                            <p className="text-muted-foreground col-span-full text-center py-8">暂无学习力提升视频</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
