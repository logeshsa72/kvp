/*
  Warnings:

  - Added the required column `qty` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stock` ADD COLUMN `qty` DOUBLE NOT NULL;
