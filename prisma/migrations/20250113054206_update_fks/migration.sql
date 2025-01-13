/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId,boardId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkUserId,clerkOrgId]` on the table `OrganisationMembership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkOrgId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkOrgId` to the `OrganisationMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `OrganisationMembership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_orgId_fkey";

-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrganisationMembership" DROP CONSTRAINT "OrganisationMembership_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganisationMembership" DROP CONSTRAINT "OrganisationMembership_userId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_boardId_key";

-- DropIndex
DROP INDEX "OrganisationMembership_userId_organisationId_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "clerkOrgId" TEXT NOT NULL,
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganisationMembership" ADD COLUMN     "clerkOrgId" TEXT NOT NULL,
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clerkUserId_boardId_key" ON "Favorite"("clerkUserId", "boardId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganisationMembership_clerkUserId_clerkOrgId_key" ON "OrganisationMembership"("clerkUserId", "clerkOrgId");

-- AddForeignKey
ALTER TABLE "OrganisationMembership" ADD CONSTRAINT "OrganisationMembership_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationMembership" ADD CONSTRAINT "OrganisationMembership_clerkOrgId_fkey" FOREIGN KEY ("clerkOrgId") REFERENCES "Organisation"("clerkOrgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_clerkOrgId_fkey" FOREIGN KEY ("clerkOrgId") REFERENCES "Organisation"("clerkOrgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
