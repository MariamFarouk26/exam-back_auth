/*
  Warnings:

  - You are about to drop the column `answer` on the `StudentAnswer` table. All the data in the column will be lost.
  - Added the required column `correctAnswerId` to the `StudentAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "correctAnswerId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "StudentAnswer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudentAnswer" ("id", "questionId", "studentId") SELECT "id", "questionId", "studentId" FROM "StudentAnswer";
DROP TABLE "StudentAnswer";
ALTER TABLE "new_StudentAnswer" RENAME TO "StudentAnswer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
