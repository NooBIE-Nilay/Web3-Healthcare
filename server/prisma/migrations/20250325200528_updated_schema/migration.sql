/*
  Warnings:

  - You are about to drop the column `recordDesc` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `recordHash` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `recordLink` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `recordTitle` on the `MedicalRecord` table. All the data in the column will be lost.
  - Added the required column `hash` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "recordDesc",
DROP COLUMN "recordHash",
DROP COLUMN "recordLink",
DROP COLUMN "recordTitle",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
