/*
  Warnings:

  - Added the required column `leadImportId` to the `LeadMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leadmaster` ADD COLUMN `leadImportId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `LeadImport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadCategoriesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeadImport` ADD CONSTRAINT `LeadImport_leadCategoriesId_fkey` FOREIGN KEY (`leadCategoriesId`) REFERENCES `LeadCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadMaster` ADD CONSTRAINT `LeadMaster_leadImportId_fkey` FOREIGN KEY (`leadImportId`) REFERENCES `LeadImport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
