-- CreateTable
CREATE TABLE "paragraph" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "markdown" BOOLEAN,
    "tags" TEXT[],
    "time" DATE NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "paragraph_pkey" PRIMARY KEY ("id")
);
