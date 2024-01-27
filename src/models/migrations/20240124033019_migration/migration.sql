/*
  Warnings:

  - Made the column `AllocationId` on table `allocationdetail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `allocationdetail` DROP FOREIGN KEY `AllocationDetail_AllocationId_fkey`;

-- AlterTable
ALTER TABLE `allocationdetail` MODIFY `AllocationId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CallLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadMasterId` INTEGER NOT NULL,
    `data` VARCHAR(191) NULL,
    `FollowupDate` DATETIME(3) NOT NULL,
    `Result` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AllocationDetail` ADD CONSTRAINT `AllocationDetail_AllocationId_fkey` FOREIGN KEY (`AllocationId`) REFERENCES `Allocation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CallLog` ADD CONSTRAINT `CallLog_leadMasterId_fkey` FOREIGN KEY (`leadMasterId`) REFERENCES `LeadMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
