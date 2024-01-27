-- AlterTable
ALTER TABLE `pinwardorreturn` MODIFY `inwardOrReturn` ENUM('PurchaseInward', 'PurchaseReturn', 'ProcessDelivery', 'ProcessInward') NOT NULL;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemType` ENUM('GreyYarn', 'DyedYarn', 'GreyFabric', 'DyedFabric', 'Accessory') NOT NULL,
    `inOrOut` ENUM('PurchaseInward', 'PurchaseReturn', 'ProcessDelivery', 'ProcessInward') NOT NULL,
    `itemDetails` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
