/*
  Warnings:

  - You are about to alter the column `time` on the `Paragraph` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Paragraph` MODIFY `time` DATETIME NOT NULL;
