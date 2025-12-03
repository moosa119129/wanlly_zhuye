import { PageHeader } from "@/components/page-header";

export default function InsightsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="💡 观点与思考"
                description="深度文章与独立见解,记录成长与思考的轨迹。"
            />
            <div className="container py-12 px-4 md:px-6">
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="text-6xl">🚧</div>
                        <h2 className="text-2xl font-bold">页面维护中</h2>
                        <p className="text-muted-foreground">
                            我们正在升级文章系统,敬请期待...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
