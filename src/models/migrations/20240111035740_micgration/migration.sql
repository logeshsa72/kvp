/*
  Warnings:

  - You are about to drop the column `allocationId` on the `allocationdetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `allocationdetail` DROP FOREIGN KEY `AllocationDetail_allocationId_fkey`;

-- DropIndex
DROP INDEX `Allocation_userId_fkey` ON `allocation`;

-- AlterTable
ALTER TABLE `allocationdetail` DROP COLUMN `allocationId`,
    ADD COLUMN `AllocationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Allocation` ADD CONSTRAINT `Allocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AllocationDetail` ADD CONSTRAINT `AllocationDetail_AllocationId_fkey` FOREIGN KEY (`AllocationId`) REFERENCES `Allocation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
