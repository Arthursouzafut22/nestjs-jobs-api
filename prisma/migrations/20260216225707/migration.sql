-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECRUITER', 'CANDIDATE', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "targetaFeaturedJob" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Enterprise" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "wage" TEXT NOT NULL,
    "typeOfContract" TEXT NOT NULL,
    "workShift" TEXT NOT NULL,
    "WorkSchedule" TIMESTAMP(3) NOT NULL,
    "daysWorkedPerWeek" TEXT NOT NULL,
    "workTime" TEXT NOT NULL,
    "skills" TEXT[],
    "education" TEXT NOT NULL,
    "descriptionVacancy" TEXT NOT NULL,
    "benefits" TEXT[],

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vacancyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
