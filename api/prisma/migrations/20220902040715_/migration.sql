-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "creatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
