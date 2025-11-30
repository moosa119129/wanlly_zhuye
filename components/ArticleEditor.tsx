"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Link as LinkIcon } from "lucide-react";
import { importWeChatArticle } from "@/app/actions/article-import";

interface ArticleEditorProps {
    content: string;
    onChange: (value: string) => void;
}

export function ArticleEditor({ content, onChange }: ArticleEditorProps) {
    const [uploading, setUploading] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importUrl, setImportUrl] = useState("");

    const handlePaste = async (event: React.ClipboardEvent) => {
        const items = event.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                event.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    await uploadImage(file);
                }
            }
        }
    };

    const uploadImage = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url;
                const imageMarkdown = `![Image](${imageUrl})`;
                onChange(content + "\n" + imageMarkdown);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleImport = async () => {
        if (!importUrl) return;

        setImporting(true);
        try {
            const result = await importWeChatArticle(importUrl);
            if (result.error) {
                alert(result.error);
            } else {
                // Append imported content
                const newContent = content ? content + "\n\n" + result.content : result.content || "";
                onChange(newContent);
                setImportUrl("");
                alert("Import successful! Check the content.");
            }
        } catch (error) {
            console.error("Import failed:", error);
            alert("Import failed");
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="space-y-4" data-color-mode="light">
            <div className="flex items-center gap-4 p-2 bg-muted rounded-md">
                <div className="flex-1 flex items-center gap-2">
                    <Input
                        placeholder="输入微信公众号文章链接..."
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        className="h-8"
                    />
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleImport}
                        disabled={importing || !importUrl}
                    >
                        {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <LinkIcon className="h-4 w-4 mr-2" />}
                        导入公众号文章
                    </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                    💡 支持粘贴图片上传
                </div>
            </div>

            <div className="relative">
                {uploading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Uploading image...</span>
                        </div>
                    </div>
                )}
                <MDEditor
                    value={content}
                    onChange={(val) => onChange(val || "")}
                    height={600}
                    onPaste={handlePaste}
                    preview="live"
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
            </div>
        </div>
    );
}
