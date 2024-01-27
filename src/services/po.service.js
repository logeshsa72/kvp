import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';
import { generateOrderProductID } from '../utils/helper.js';

const prisma = new PrismaClient()

async function getAlreadyInwardedQty(po, poItemId) {
    let supplierInwards = await prisma.pInwardOrReturn.findMany({
        where: {
            supplierId: parseInt(po.supplierId),
        }
    })
    let poItems = []
    supplierInwards.forEach(poInwardOrReturn =>
        poInwardOrReturn.poInwardReturnItems.forEach(poItem => {
            if (poItem.poItemId === poItemId) {
                poItems.push(poItem)
            }
        })
    )
    let totalInwardQty = poItems.reduce((total, currentPoItem) => {
        return total + parseFloat(currentPoItem.inwardQty)
    }, 0)
    return totalInwardQty
}

function addAlreadyQuantity(po) {
    const promises = po.poItems.map(async (item) => {
        let data = await getAlreadyInwardedQty(po, item.poItemId)
        item["alreadyInwardedQty"] = data
        return item
    })
    return Promise.all(promises)
}

function getAllAlreadyQty(poAll){
    const promises = poAll.map(async(po) => {
        po["poItems"] = await addAlreadyQuantity(po)
        return po
    })
    return Promise.all(promises)
}



async function get(req) {
    const { branchId, active } = req.query
    let data = await prisma.po.findMany({
        where: {
            branchId: branchId ? parseInt(branchId) : undefined,
            active: active ? Boolean(active) : undefined,
        }
    });
    data = await getAllAlreadyQty(data)
    return { statusCode: 0, data };
}


async function getOne(id) {
    const childRecord = 0;
    let po = await prisma.po.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!po) return NoRecordFound("po");
    po["poItems"] = await addAlreadyQuantity(po)
    return { statusCode: 0, data: { ...po, ...{ childRecord } } };
}

async function getSearch(req) {
    const { companyId, active } = req.query
    const { searchKey } = req.params
    const data = await prisma.po.findMany({
        where: {
            country: {
                companyId: companyId ? parseInt(companyId) : undefined,
            },
            active: active ? Boolean(active) : undefined,
            OR: [
                {
                    aliasName: {
                        contains: searchKey,
                    },
                }
            ],
        }
    })
    return { statusCode: 0, data: data };
}

async function create(body) {
    const { transType, dueDate, taxTemplateId,
        supplierId, poItems, payTermId,
        branchId, active, userId } = await body
    const data = await prisma.po.create({
        data: {
            transType,
            taxTemplateId: parseInt(taxTemplateId),
            payTermId: parseInt(payTermId),
            dueDate: dueDate ? new Date(dueDate) : undefined,
            supplierId: parseInt(supplierId),
            branchId: parseInt(branchId),
            poItems: poItems.map(item => {
                item["poItemId"] = generateOrderProductID()
                return item
            }),
            active,
            createdById: parseInt(userId)
        },
    });
    return { statusCode: 0, data };
}

async function update(id, body) {
    const { transType, dueDate, taxTemplateId,
        supplierId, poItems, payTermId,
        branchId, active, userId } = await body
    const dataFound = await prisma.po.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("po");

    const isAlreadyItemAdded = id => {
        let item = dataFound.poItems.find(item => parseInt(item.poItemId) === parseInt(id))
        if (!item) return false
        return true
    }

    let updatePoItems = poItems.filter(item => isAlreadyItemAdded(item.poItemId))
    let newPoItems = poItems.filter(item => !isAlreadyItemAdded(item.poItemId))

    newPoItems = newPoItems.map(item => {
        item["poItemId"] = generateOrderProductID()
        return item
    }
    )

    const data = await prisma.po.update({
        where: {
            id: parseInt(id),
        },
        data: {
            transType,
            taxTemplateId: parseInt(taxTemplateId),
            payTermId: parseInt(payTermId),
            dueDate: dueDate ? new Date(dueDate) : undefined,
            supplierId: parseInt(supplierId),
            branchId: parseInt(branchId),
            poItems: [...updatePoItems, ...newPoItems],
            active,
            updatedById: parseInt(userId)
        },
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.po.delete({
        where: {
            id: parseInt(id)
        },
    })
    return { statusCode: 0, data };
}

export {
    get,
    getOne,
    getSearch,
    create,
    update,
    remove
}
