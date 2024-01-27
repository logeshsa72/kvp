/*
  Warnings:

  - You are about to drop the column `Report` on the `leadmaster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `leadmaster` DROP COLUMN `Report`,
    ADD COLUMN `report` ENUM('INTERESTED', 'NOTINTERESTED', 'FOLLOWUP') NULL;
