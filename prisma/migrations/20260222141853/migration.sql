/*
  Warnings:

  - You are about to drop the column `Enterprise` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `JobTitle` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `WorkSchedule` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `enterprise` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workSchedule` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "Enterprise",
DROP COLUMN "JobTitle",
DROP COLUMN "WorkSchedule",
ADD COLUMN     "activities" TEXT[],
ADD COLUMN     "differences" TEXT[],
ADD COLUMN     "enterprise" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "workSchedule" TIMESTAMP(3) NOT NULL;
