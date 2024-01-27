-- CreateTable
CREATE TABLE `LeadMaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadMasterId` INTEGER NOT NULL,
    `headingId` INTEGER NOT NULL,
    `data` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeadDetails` ADD CONSTRAINT `LeadDetails_leadMasterId_fkey` FOREIGN KEY (`leadMasterId`) REFERENCES `LeadMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadDetails` ADD CONSTRAINT `LeadDetails_headingId_fkey` FOREIGN KEY (`headingId`) REFERENCES `Heading`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
