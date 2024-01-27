/*
  Warnings:

  - The values [CALL] on the enum `CallLog_report` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `Report` on the `leadmaster` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `calllog` MODIFY `report` ENUM('INTERESTED', 'NOTINTERESTED', 'FOLLOWUP') NULL;

-- AlterTable
ALTER TABLE `leadmaster` MODIFY `Report` ENUM('INTERESTED', 'NOTINTERESTED', 'FOLLOWUP') NULL;
