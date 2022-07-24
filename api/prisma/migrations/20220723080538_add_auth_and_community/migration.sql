/*
  Warnings:

  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubLogin` on the `User` table. All the data in the column will be lost.
  - Added the required column `authId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
DROP COLUMN "githubLogin",
ADD COLUMN     "authId" INTEGER NOT NULL,
ADD COLUMN     "communityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "githubId" TEXT NOT NULL,
    "githubLogin" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
