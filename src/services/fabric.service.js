import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';

const prisma = new PrismaClient()


async function get(req) {
    const { companyId, active } = req.query
    const data = await prisma.fabric.findMany({
        where: {
            companyId: companyId ? parseInt(companyId) : undefined,
            active: active ? Boolean(active) : undefined,
        }
    });
    return { statusCode: 0, data };
}


async function getOne(id) {
    const childRecord = 0;
    const data = await prisma.fabric.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            FabricOnYarnBlend: true
        }
    })
    if (!data) return NoRecordFound("fabric");
    return { statusCode: 0, data: { ...data, ...{ childRecord } } };
}

async function getSearch(req) {
    const { searchKey } = req.params
    const { companyId, active } = req.query
    const data = await prisma.fabric.findMany({
        where: {
            companyId: companyId ? parseInt(companyId) : undefined,
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
    const { fabricTypeId, aliasName, hsn, yarnBlendDetails,organic, companyId, active } = await body
    const data = await prisma.fabric.create(
        {
            data: {
                fabricTypeId: parseInt(fabricTypeId),
                aliasName, hsn,
                FabricOnYarnBlend: yarnBlendDetails ? {
                    createMany: {
                        data: yarnBlendDetails.map(blend => {
                            return { yarnBlendId: parseInt(blend.yarnBlendId), percentage: parseInt(blend.percentage) }
                        })
                    }
                } : undefined,
                organic,
                companyId: parseInt(companyId), active
            }
        }
    )
    return { statusCode: 0, data };
}

async function update(id, body) {
    const { fabricTypeId, aliasName, hsn, yarnBlendDetails,organic, companyId, active } = await body
    const dataFound = await prisma.fabric.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("fabric");
    const data = await prisma.fabric.update({
        where: {
            id: parseInt(id),
        },
        data: {
            fabricTypeId: parseInt(fabricTypeId),
            aliasName, hsn,
            FabricOnYarnBlend: yarnBlendDetails ? {
                deleteMany:{},
                createMany: {
                    data: yarnBlendDetails.map(blend => {
                        return { yarnBlendId: parseInt(blend.yarnBlendId), percentage: parseInt(blend.percentage) }
                    })
                }
            } : undefined,
            organic,
            companyId: parseInt(companyId), active
        }
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.fabric.delete({
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
