/*
  Warnings:

  - You are about to drop the column `leadMasterId` on the `allocation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `allocation` DROP FOREIGN KEY `Allocation_leadMasterId_fkey`;

-- AlterTable
ALTER TABLE `allocation` DROP COLUMN `leadMasterId`;

-- CreateTable
CREATE TABLE `_AllocationToAllocationDetail` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AllocationToAllocationDetail_AB_unique`(`A`, `B`),
    INDEX `_AllocationToAllocationDetail_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AllocationDetail` ADD CONSTRAINT `AllocationDetail_leadMasterId_fkey` FOREIGN KEY (`leadMasterId`) REFERENCES `LeadMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllocationToAllocationDetail` ADD CONSTRAINT `_AllocationToAllocationDetail_A_fkey` FOREIGN KEY (`A`) REFERENCES `Allocation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllocationToAllocationDetail` ADD CONSTRAINT `_AllocationToAllocationDetail_B_fkey` FOREIGN KEY (`B`) REFERENCES `AllocationDetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
