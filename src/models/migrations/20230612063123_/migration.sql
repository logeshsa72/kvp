/*
  Warnings:

  - Added the required column `transType` to the `PInwardOrReturn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pinwardorreturn` ADD COLUMN `transType` ENUM('PI', 'PR') NOT NULL;
