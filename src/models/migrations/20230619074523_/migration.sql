/*
  Warnings:

  - You are about to drop the `accessory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accessorygroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accessoryitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `counts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `design` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fabric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fabriconyarnblend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fabrictype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gauge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gsm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hsn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `looplength` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partycategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partyonaccessoryitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payterm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pinwardorreturn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `po` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxtemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxtemplatedetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxterm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unitofmeasurement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `yarn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `yarnblend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `yarnonyarnblend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `yarntype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `Accessory_accessoryItemId_fkey`;

-- DropForeignKey
ALTER TABLE `accessory` DROP FOREIGN KEY `Accessory_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `accessorygroup` DROP FOREIGN KEY `AccessoryGroup_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryitem` DROP FOREIGN KEY `AccessoryItem_accessoryGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `accessoryitem` DROP FOREIGN KEY `AccessoryItem_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `color` DROP FOREIGN KEY `Color_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `counts` DROP FOREIGN KEY `Counts_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `currency` DROP FOREIGN KEY `Currency_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `design` DROP FOREIGN KEY `Design_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `dia` DROP FOREIGN KEY `Dia_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `fabric` DROP FOREIGN KEY `Fabric_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `fabric` DROP FOREIGN KEY `Fabric_fabricTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `fabriconyarnblend` DROP FOREIGN KEY `FabricOnYarnBlend_fabricId_fkey`;

-- DropForeignKey
ALTER TABLE `fabriconyarnblend` DROP FOREIGN KEY `FabricOnYarnBlend_yarnBlendId_fkey`;

-- DropForeignKey
ALTER TABLE `fabrictype` DROP FOREIGN KEY `FabricType_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `gauge` DROP FOREIGN KEY `Gauge_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `gsm` DROP FOREIGN KEY `Gsm_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `hsn` DROP FOREIGN KEY `Hsn_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `looplength` DROP FOREIGN KEY `LoopLength_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `party` DROP FOREIGN KEY `Party_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `party` DROP FOREIGN KEY `Party_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `party` DROP FOREIGN KEY `Party_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `party` DROP FOREIGN KEY `Party_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `party` DROP FOREIGN KEY `Party_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `partycategory` DROP FOREIGN KEY `PartyCategory_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `partyonaccessoryitems` DROP FOREIGN KEY `PartyOnAccessoryItems_accessoryItemId_fkey`;

-- DropForeignKey
ALTER TABLE `partyonaccessoryitems` DROP FOREIGN KEY `PartyOnAccessoryItems_partyId_fkey`;

-- DropForeignKey
ALTER TABLE `payterm` DROP FOREIGN KEY `PayTerm_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `pinwardorreturn` DROP FOREIGN KEY `PInwardOrReturn_branchId_fkey`;

-- DropForeignKey
ALTER TABLE `pinwardorreturn` DROP FOREIGN KEY `PInwardOrReturn_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `pinwardorreturn` DROP FOREIGN KEY `PInwardOrReturn_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `pinwardorreturn` DROP FOREIGN KEY `PInwardOrReturn_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_branchId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_deliveryBranchId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_deliveryPartyId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_payTermId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_taxTemplateId_fkey`;

-- DropForeignKey
ALTER TABLE `po` DROP FOREIGN KEY `Po_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `size` DROP FOREIGN KEY `Size_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `taxtemplate` DROP FOREIGN KEY `TaxTemplate_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `taxtemplatedetails` DROP FOREIGN KEY `TaxTemplateDetails_taxTemplateId_fkey`;

-- DropForeignKey
ALTER TABLE `taxtemplatedetails` DROP FOREIGN KEY `TaxTemplateDetails_taxTermId_fkey`;

-- DropForeignKey
ALTER TABLE `taxterm` DROP FOREIGN KEY `TaxTerm_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `unitofmeasurement` DROP FOREIGN KEY `UnitOfMeasurement_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `yarn` DROP FOREIGN KEY `Yarn_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `yarn` DROP FOREIGN KEY `Yarn_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `yarn` DROP FOREIGN KEY `Yarn_countsId_fkey`;

-- DropForeignKey
ALTER TABLE `yarn` DROP FOREIGN KEY `Yarn_yarnTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnblend` DROP FOREIGN KEY `YarnBlend_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnonyarnblend` DROP FOREIGN KEY `YarnOnYarnBlend_yarnBlendId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnonyarnblend` DROP FOREIGN KEY `YarnOnYarnBlend_yarnId_fkey`;

-- DropForeignKey
ALTER TABLE `yarntype` DROP FOREIGN KEY `YarnType_companyId_fkey`;

-- DropTable
DROP TABLE `accessory`;

-- DropTable
DROP TABLE `accessorygroup`;

-- DropTable
DROP TABLE `accessoryitem`;

-- DropTable
DROP TABLE `color`;

-- DropTable
DROP TABLE `content`;

-- DropTable
DROP TABLE `counts`;

-- DropTable
DROP TABLE `currency`;

-- DropTable
DROP TABLE `design`;

-- DropTable
DROP TABLE `dia`;

-- DropTable
DROP TABLE `fabric`;

-- DropTable
DROP TABLE `fabriconyarnblend`;

-- DropTable
DROP TABLE `fabrictype`;

-- DropTable
DROP TABLE `gauge`;

-- DropTable
DROP TABLE `gsm`;

-- DropTable
DROP TABLE `hsn`;

-- DropTable
DROP TABLE `looplength`;

-- DropTable
DROP TABLE `party`;

-- DropTable
DROP TABLE `partycategory`;

-- DropTable
DROP TABLE `partyonaccessoryitems`;

-- DropTable
DROP TABLE `payterm`;

-- DropTable
DROP TABLE `pinwardorreturn`;

-- DropTable
DROP TABLE `po`;

-- DropTable
DROP TABLE `size`;

-- DropTable
DROP TABLE `stock`;

-- DropTable
DROP TABLE `taxtemplate`;

-- DropTable
DROP TABLE `taxtemplatedetails`;

-- DropTable
DROP TABLE `taxterm`;

-- DropTable
DROP TABLE `unitofmeasurement`;

-- DropTable
DROP TABLE `yarn`;

-- DropTable
DROP TABLE `yarnblend`;

-- DropTable
DROP TABLE `yarnonyarnblend`;

-- DropTable
DROP TABLE `yarntype`;
