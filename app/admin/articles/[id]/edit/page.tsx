"use client"

export const runtime = 'edge';

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleEditor } from "@/components/ArticleEditor"

interface EditArticlePageProps {
    params: {
        id: string;
    };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false
    })

    useEffect(() => {
        fetch(`/api/articles/${params.id}`)
            .then(res => res.json())
            .then(article => {
                setFormData({
                    title: article.title,
                    slug: article.slug,
                    excerpt: article.excerpt || "",
                    content: article.content,
                    coverImage: article.coverImage || "",
                    published: article.published
                })
                setLoading(false)
            })
            .catch(() => {
                alert("加载失败")
                router.push("/admin/articles")
            })
    }, [params.id, router])

    const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    published: publish !== undefined ? publish : formData.published
                })
            })

            if (response.ok) {
                router.push("/admin/articles")
                router.refresh()
            } else {
                alert("保存失败，请重试")
            }
        } catch (error) {
            console.error(error)
            alert("保存失败，请重试")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("确定要删除这篇文章吗？此操作不可恢复。")) return

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                router.push("/admin/articles")
                router.refresh()
            } else {
                alert("删除失败")
            }
        } catch (error) {
            alert("删除失败")
        }
    }

    if (loading) {
        return <div className="container py-12 text-center">加载中...</div>
    }

    return (
        <div className="container max-w-7xl mx-auto py-12 px-4 md:px-6">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">编辑文章</h1>
                    <p className="text-muted-foreground mt-2">修改您的文章内容</p>
                </div>
                <Button variant="destructive" onClick={handleDelete}>
                    删除文章
                </Button>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
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
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="slug">URL 别名 *</Label>
                            <Input
                                id="slug"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="excerpt">摘要</Label>
                            <Textarea
                                id="excerpt"
                                rows={3}
                                value={formData.excerpt}
                                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="coverImage">封面图片 URL</Label>
                            <Input
                                id="coverImage"
                                value={formData.coverImage}
                                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                            />
                        </div>
                    </CardContent>
                </Card>

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
                        disabled={saving}
                    >
                        保存
                    </Button>
                    {!formData.published && (
                        <Button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            disabled={saving}
                        >
                            发布文章
                        </Button>
                    )}
                    {formData.published && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => handleSubmit(e, false)}
                            disabled={saving}
                        >
                            取消发布
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
