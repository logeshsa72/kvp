/*
  Warnings:

  - You are about to drop the column `data` on the `calllog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `calllog` DROP COLUMN `data`,
    ADD COLUMN `Comment` VARCHAR(191) NULL;
