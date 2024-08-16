/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filename]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "File_filename_key" ON "File"("filename");
