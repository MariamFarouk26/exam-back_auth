/*
  Warnings:

  - Added the required column `duration` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "duration" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Exam" ("id") SELECT "id" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
