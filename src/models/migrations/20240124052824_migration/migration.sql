/*
  Warnings:

  - You are about to drop the column `Comment` on the `calllog` table. All the data in the column will be lost.
  - You are about to drop the column `FollowupDate` on the `calllog` table. All the data in the column will be lost.
  - You are about to drop the column `Report` on the `calllog` table. All the data in the column will be lost.
  - Added the required column `followupDate` to the `CallLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calllog` DROP COLUMN `Comment`,
    DROP COLUMN `FollowupDate`,
    DROP COLUMN `Report`,
    ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `followupDate` DATETIME(3) NOT NULL,
    ADD COLUMN `report` VARCHAR(191) NULL;
