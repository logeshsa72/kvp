/*
  Warnings:

  - You are about to alter the column `report` on the `calllog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `calllog` MODIFY `followupDate` DATETIME(3) NULL,
    MODIFY `report` ENUM('INTERESTED', 'NOTINTERESTED', 'FOLLOWUP') NULL;
