-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "bvid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'long',
    "coverImage" TEXT,
    "category" TEXT NOT NULL DEFAULT '深度解析'
);
INSERT INTO "new_Video" ("bvid", "coverImage", "id", "title", "type") SELECT "bvid", "coverImage", "id", "title", "type" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_bvid_key" ON "Video"("bvid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
