import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${uuidv4()}${path.extname(file.name)}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if directory already exists
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const url = `/uploads/${filename}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}
