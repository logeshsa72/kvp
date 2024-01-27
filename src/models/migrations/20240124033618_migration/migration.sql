/*
  Warnings:

  - You are about to drop the column `Result` on the `calllog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `calllog` DROP COLUMN `Result`,
    ADD COLUMN `Report` VARCHAR(191) NULL;
