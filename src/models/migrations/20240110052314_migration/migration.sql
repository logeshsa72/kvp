/*
  Warnings:

  - You are about to drop the column `userId` on the `allocationdetail` table. All the data in the column will be lost.
  - You are about to drop the `_allocationtoallocationdetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `Allocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_allocationtoallocationdetail` DROP FOREIGN KEY `_AllocationToAllocationDetail_A_fkey`;

-- DropForeignKey
ALTER TABLE `_allocationtoallocationdetail` DROP FOREIGN KEY `_AllocationToAllocationDetail_B_fkey`;

-- DropForeignKey
ALTER TABLE `allocation` DROP FOREIGN KEY `Allocation_userId_fkey`;

-- AlterTable
ALTER TABLE `allocation` ADD COLUMN `createdById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `allocationdetail` DROP COLUMN `userId`,
    ADD COLUMN `allocationId` INTEGER NULL;

-- DropTable
DROP TABLE `_allocationtoallocationdetail`;

-- AddForeignKey
ALTER TABLE `Allocation` ADD CONSTRAINT `Allocation_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AllocationDetail` ADD CONSTRAINT `AllocationDetail_allocationId_fkey` FOREIGN KEY (`allocationId`) REFERENCES `Allocation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
