"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface LoginModalProps {
    onLogin: (name: string, phone: string) => void
}

export function LoginModal({ onLogin }: LoginModalProps) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        setError("")

        // Validate Name: Must be Chinese characters, 2-4 length usually, but let's say at least 2
        const nameRegex = /^[\u4e00-\u9fa5]{2,10}$/
        if (!nameRegex.test(name)) {
            setError("请输入真实中文姓名")
            return
        }

        // Validate Phone: 11 digits
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!phoneRegex.test(phone)) {
            setError("请输入有效的11位手机号码")
            return
        }

        // Validate Password
        if (password !== "8888") {
            setError("密码错误")
            return
        }

        onLogin(name, phone)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
            >
                <Card className="w-[400px] border-slate-800 bg-slate-900/90 text-slate-100 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            AI 中考志愿决策助手
                        </CardTitle>
                        <CardDescription className="text-center text-slate-400">
                            请输入考生信息进行登录
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">考生姓名</Label>
                            <Input
                                id="name"
                                placeholder="请输入中文姓名"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-slate-800 border-slate-700 text-slate-100 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">手机号码</Label>
                            <Input
                                id="phone"
                                placeholder="请输入11位手机号"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-slate-800 border-slate-700 text-slate-100 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">访问密码</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="请输入访问密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-800 border-slate-700 text-slate-100 focus:ring-indigo-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400 text-center font-medium">{error}</p>
                        )}

                        <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2"
                            onClick={handleLogin}
                        >
                            立即登录
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
