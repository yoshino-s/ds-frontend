/*
  Warnings:

  - You are about to drop the `paragraph` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "paragraph";

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "markdown" BOOLEAN,
    "tags" TEXT[],
    "time" DATE NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);
