import { ACTIVE, INACTIVE } from "../Strings"

export const bloodList = [
    { show: "A +ve", value: "AP" },
    { show: "A -ve", value: "AN" },
    { show: "B +ve", value: "BP" },
    { show: "B -ve", value: "BN" },
    { show: "AB +ve", value: "ABP" },
    { show: "AB -ve", value: "ABN" },
    { show: "O +ve", value: "OP" },
    { show: "O -ve", value: "ON" }
]

export const genderList = [
    { show: 'MALE', value: 'MALE' },
    { show: 'FEMALE', value: 'FEMALE' },
    { show: 'OTHER', value: 'OTHER' }
]

export const maritalStatusList = [
    { show: 'SINGLE', value: 'SINGLE' },
    { show: 'MARRIED', value: 'MARRIED' },
    { show: 'SEPARATED', value: 'SEPARATED' }
]

export const pageType = [
    { show: 'MASTER', value: 'Masters' },
    { show: 'TRANSACTION', value: 'Transactions' },
    { show: 'ADMIN CONTROLS', value: 'AdminAccess' },
]

export const accessoryCategoryList = [
    { show: 'STITCHING ACCESSORIES', value: 'STITCHING' },
    { show: 'PACKING ACCESSORIES', value: 'PACKING' }
]

export const prefixCategory = [
    { show: "DEFAULT", value: "Default" },
    { show: "SPECIFIC", value: "Specific" }
]

export const employeeType = [
    { show: "PERMANENT", value: true },
    { show: "TEMPORARY", value: false }
]

export const statusDropdown = [
    {show: "ACTIVE", value: true},
    {show: "INACTIVE", value: false}
]

export const poTypes = [
    {show: "Grey Yarn", value: "GreyYarn"},
    {show: "Dyed Yarn", value: "DyedYarn"},
    {show: "Grey Fabric", value: "GreyFabric"},
    {show: "Dyed Fabric", value: "DyedFabric"},
    {show: "Accessory", value: "Accessory"},
]

export const discountTypes = [
    {show: "Flat", value: "Flat"},
    {show: "Percentage", value: "Percentage"}
]

export const diaMeasurementList = [
    {show: "CMS", value: "CMS"},
    {show: "Inches", value: "INCHES"},
    {show: "Open Width", value: "OPENWIDTH"},
    {show: "Tubuler", value: "TUBULER"},
]

export const purchasePrPi = [
    {show: "Purchase Inward", value: "PurchaseInward"},
    {show: "Purchase Return", value: "PurchaseReturn"}
]