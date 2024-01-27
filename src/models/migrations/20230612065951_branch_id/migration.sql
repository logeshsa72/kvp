/*
  Warnings:

  - Added the required column `branchId` to the `PInwardOrReturn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pinwardorreturn` ADD COLUMN `branchId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PInwardOrReturn` ADD CONSTRAINT `PInwardOrReturn_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
