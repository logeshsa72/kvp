/*
  Warnings:

  - You are about to drop the column `poInwardItems` on the `pinwardorreturn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pinwardorreturn` DROP COLUMN `poInwardItems`,
    ADD COLUMN `poInwardReturnItems` JSON NULL;
