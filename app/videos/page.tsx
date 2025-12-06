import { PageHeader } from "@/components/page-header";
import { VIDEOS } from "@/lib/static-data";
import { Badge } from "@/components/ui/badge";

export default function VideosPage() {
    // 获取所有分类
    const categories = Array.from(new Set(VIDEOS.map(v => v.category)));

    return (
        <div className="flex flex-col">
            <PageHeader
                title="🎬 深度视频"
                description="探索教育的深度与广度，涵盖中考政策、升学规划、志愿填报等专题内容。"
            />
            <div className="container mx-auto px-4 py-12 space-y-16">
                {categories.map((category) => {
                    const categoryVideos = VIDEOS.filter(v => v.category === category);
                    return (
                        <section key={category}>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-semibold border-l-4 border-primary pl-4">{category}</h2>
                                <Badge variant="secondary">{categoryVideos.length}个视频</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoryVideos.map((video) => (
                                    <a
                                        key={video.id}
                                        href={video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "#"}
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
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary transition-colors">
                                                {video.title}
                                            </h3>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {VIDEOS.length === 0 && (
                    <p className="text-muted-foreground text-center py-12">暂无视频内容</p>
                )}
            </div>
        </div>
    )
}
