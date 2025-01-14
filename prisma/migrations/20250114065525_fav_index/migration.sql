-- CreateIndex
CREATE INDEX "Favorite_clerkUserId_boardId_idx" ON "Favorite"("clerkUserId", "boardId");

-- CreateIndex
CREATE INDEX "Favorite_clerkOrgId_boardId_idx" ON "Favorite"("clerkOrgId", "boardId");
