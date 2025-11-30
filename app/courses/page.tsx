import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="container py-12 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">精选课程</h1>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        来自资深教育专家的升学规划与志愿填报指南，助你轻松应对升学挑战。
                    </p>
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => {
                    const features = JSON.parse(course.features) as string[]
                    return (
                        <Card key={course.id} className="flex flex-col overflow-hidden border-muted/40 shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-video relative bg-muted">
                                <Image
                                    src={course.coverImage}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                        视频课程
                                    </Badge>
                                    <span className="text-lg font-bold text-primary">{course.price}</span>
                                </div>
                                <CardTitle className="line-clamp-2 min-h-[3.5rem]">{course.title}</CardTitle>
                                <CardDescription className="line-clamp-3 min-h-[4.5rem]">{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="grid gap-2 text-sm text-muted-foreground">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" size="lg">
                                    <Link href={course.linkUrl} target="_blank" rel="noopener noreferrer">
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        立即学习
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
