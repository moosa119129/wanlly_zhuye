import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { saveVideo } from "../actions"

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const password = params.password

    if (password !== 'admin123') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Tabs defaultValue="videos" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="apps">AI Apps</TabsTrigger>
                </TabsList>

                <TabsContent value="articles">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Articles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Article management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="videos">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Video</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={saveVideo} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bvid">Bilibili BV ID</Label>
                                    <Input id="bvid" name="bvid" placeholder="BV..." required />
                                </div>
                                <Button type="submit">Save Video</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="apps">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage AI Apps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>App management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
