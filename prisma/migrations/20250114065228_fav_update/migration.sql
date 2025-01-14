/*
  Warnings:

  - Added the required column `clerkOrgId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "clerkOrgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_clerkOrgId_fkey" FOREIGN KEY ("clerkOrgId") REFERENCES "Organisation"("clerkOrgId") ON DELETE CASCADE ON UPDATE CASCADE;
