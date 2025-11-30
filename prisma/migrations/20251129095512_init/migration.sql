-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "bvid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'long',
    "coverImage" TEXT
);

-- CreateTable
CREATE TABLE "AppDemo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "coverImage" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_bvid_key" ON "Video"("bvid");
