/*
  Warnings:

  - You are about to drop the column `heading` on the `heading` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Heading` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Heading` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Heading_heading_key` ON `heading`;

-- AlterTable
ALTER TABLE `heading` DROP COLUMN `heading`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Heading_name_key` ON `Heading`(`name`);
