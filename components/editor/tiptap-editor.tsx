"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Button } from '@/components/ui/button'
import {
    Bold, Italic, Strikethrough, Code,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Undo, Redo,
    ImageIcon
} from 'lucide-react'

interface TiptapEditorProps {
    content: string
    onChange: (html: string) => void
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            TextStyle,
            Color
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert max-w-none min-h-[400px] p-4 focus:outline-none border rounded-md'
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })

    if (!editor) {
        return null
    }

    const addImage = () => {
        const url = window.prompt('请输入图片 URL:')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
                <Button
                    type="button"
                    variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="粗体"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="斜体"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    title="删除线"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('code') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    title="代码"
                >
                    <Code className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    title="一级标题"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="二级标题"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    title="三级标题"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button
                    type="button"
                    variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="无序列表"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="有序列表"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="引用"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    title="插入图片"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="撤销"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="重做"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    )
}
