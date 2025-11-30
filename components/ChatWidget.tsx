"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
    id: string
    role: "user" | "ai"
    content: string
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "ai",
            content: "你好！我是 AI 助手，有什么可以帮你的吗？你可以问我关于课程、视频或 AI 技术的问题。",
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const toggleChat = () => setIsOpen(!isOpen)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate AI delay and response
        setTimeout(() => {
            let aiResponseContent = ""
            const lowerInput = userMessage.content.toLowerCase()

            if (lowerInput.includes("课程") || lowerInput.includes("course")) {
                aiResponseContent = "你可以点击顶部导航栏的‘课程’查看最新内容，或扫码加微信咨询。"
            } else if (lowerInput.includes("视频") || lowerInput.includes("video")) {
                aiResponseContent = "最新视频已更新在‘视频’版块，欢迎观看。"
            } else {
                aiResponseContent = "这个问题很有趣！Wanlly 正在赶来的路上，你可以稍后通过微信联系他。"
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponseContent,
            }

            setMessages((prev) => [...prev, aiMessage])
            setIsTyping(false)
        }, 1000)
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <Card className="w-[350px] h-[500px] mb-4 shadow-xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5" />
                            <CardTitle className="text-base">Wanlly 的 AI 助手</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground"
                            onClick={toggleChat}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-full",
                                    msg.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                    )}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-muted text-foreground max-w-[80%] rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                        <form onSubmit={handleSend} className="flex w-full gap-2">
                            <Input
                                placeholder="输入消息..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {/* Hint Bubble */}
            {!isOpen && (
                <div className="absolute bottom-16 right-0 mb-2 whitespace-nowrap bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-bounce">
                    点这里咨询
                    <div className="absolute -bottom-1 right-6 w-2 h-2 bg-blue-600 rotate-45"></div>
                </div>
            )}

            {/* Floating Button */}
            <Button
                onClick={toggleChat}
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800 text-white transition-transform hover:scale-105 relative"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </Button>
        </div>
    )
}
