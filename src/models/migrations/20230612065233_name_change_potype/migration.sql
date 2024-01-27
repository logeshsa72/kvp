/*
  Warnings:

  - You are about to drop the column `transType` on the `pinwardorreturn` table. All the data in the column will be lost.
  - Added the required column `inwardOrReturn` to the `PInwardOrReturn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pinwardorreturn` DROP COLUMN `transType`,
    ADD COLUMN `inwardOrReturn` ENUM('PurchaseInward', 'PurchaseReturn') NOT NULL;
