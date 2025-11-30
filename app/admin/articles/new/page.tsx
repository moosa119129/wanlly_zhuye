"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleEditor } from "@/components/ArticleEditor"

export default function NewArticlePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false
    })

    const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    published: publish
                })
            })

            if (response.ok) {
                router.push("/admin/articles")
                router.refresh()
            } else {
                alert("创建失败，请重试")
            }
        } catch (error) {
            console.error(error)
            alert("创建失败，请重试")
        } finally {
            setLoading(false)
        }
    }

    // Auto-generate slug from title
    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || title.toLowerCase()
                .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
                .replace(/^-|-$/g, '')
        }))
    }

    return (
        <div className="container max-w-7xl mx-auto py-12 px-4 md:px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">撰写新文章</h1>
                <p className="text-muted-foreground mt-2">创建并发布您的文章内容</p>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>基本信息</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">标题 *</Label>
                            <Input
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="输入文章标题"
                            />
                        </div>

                        <div>
                            <Label htmlFor="slug">URL 别名 *</Label>
                            <Input
                                id="slug"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                placeholder="url-slug"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                将用于文章 URL: /insights/{formData.slug || 'url-slug'}
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="excerpt">摘要</Label>
                            <Textarea
                                id="excerpt"
                                rows={3}
                                value={formData.excerpt}
                                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                placeholder="简短描述文章内容（用于SEO和卡片展示）"
                            />
                        </div>

                        <div>
                            <Label htmlFor="coverImage">封面图片 URL</Label>
                            <Input
                                id="coverImage"
                                value={formData.coverImage}
                                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Article Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>文章内容 *</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ArticleEditor
                            content={formData.content}
                            onChange={(markdown) => setFormData(prev => ({ ...prev, content: markdown }))}
                        />
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        取消
                    </Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={loading}
                    >
                        保存草稿
                    </Button>
                    <Button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={loading}
                    >
                        发布文章
                    </Button>
                </div>
            </form>
        </div>
    )
}
