/*
  Warnings:

  - The values [PI,PR] on the enum `PInwardOrReturn_transType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `pinwardorreturn` MODIFY `transType` ENUM('PurchaseInward', 'PurchaseReturn') NOT NULL;
