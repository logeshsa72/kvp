import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';
import { updateStockItems } from '../utils/helper.js';

const prisma = new PrismaClient()


async function get(req) {
    const { branchId, active } = req.query
    const data = await prisma.pInwardOrReturn.findMany({
        where: {
            branchId: branchId ? parseInt(branchId) : undefined,
            active: active ? Boolean(active) : undefined,
        }
    });
    return { statusCode: 0, data };
}


async function getOne(id) {
    const childRecord = 0;
    const data = await prisma.pInwardOrReturn.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!data) return NoRecordFound("pInwardOrReturn");
    return { statusCode: 0, data: { ...data, ...{ childRecord } } };
}

async function getSearch(req) {
    const { companyId, active } = req.query
    const { searchKey } = req.params
    const data = await prisma.pInwardOrReturn.findMany({
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
    const { poType, inwardOrReturn,
        supplierId, poInwardReturnItems,
        branchId, active, userId } = await body
    const data = await prisma.$transaction(async (tx) => {
        const data = await tx.pInwardOrReturn.create({
            data: {
                poType, inwardOrReturn,
                supplierId: parseInt(supplierId),
                branchId: parseInt(branchId),
                poInwardReturnItems,
                active,
                createdById: parseInt(userId)
            },
        })
        const done = await updateStockItems(tx, poType, inwardOrReturn, poInwardReturnItems)
    })
    return { statusCode: 0, data };
}

async function update(id, body) {
    const { transType,
        supplierId, poInwardReturnItems,
        branchId, active, userId } = await body
    const dataFound = await prisma.pInwardOrReturn.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("pInwardOrReturn");
    const data = await prisma.$transaction(async (tx) => {
        const data = await prisma.pInwardOrReturn.update({
            where: {
                id: parseInt(id),
            },
            data: {
                transType,
                supplierId: parseInt(supplierId),
                branchId: parseInt(branchId),
                poInwardItems,
                active,
                updatedById: parseInt(userId)
            },
        })
        const done = await updateStockItems(tx, poType, inwardOrReturn, poInwardReturnItems)
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.pInwardOrReturn.delete({
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
