/*
  Warnings:

  - You are about to drop the column `comment` on the `leaddetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `leaddetails` DROP COLUMN `comment`;

-- AlterTable
ALTER TABLE `leadmaster` ADD COLUMN `comment` VARCHAR(191) NULL;
