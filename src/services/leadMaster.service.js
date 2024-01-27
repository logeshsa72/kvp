import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';

const prisma = new PrismaClient()


async function get(req) {
    let data = await prisma.leadMaster.findMany({
        where: {
            AllocationDetail: {
                none: {} 
            }
        },
        include: {
            LeadDetails: {
                include: {
                    Heading: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    console.log(data,'leadMasterData')

    data = data.map(lead => {
        let newItem = { id: lead.id };
        lead.LeadDetails.forEach(i => {
            newItem[i.Heading.name] = i.data;
        });
        return newItem;
    });

    return { statusCode: 0, data };
}



async function getOne(id) {
    try {
        const data = await prisma.leadMaster.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                LeadDetails: {
                    include: {
                        Heading: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        let result={id :data.id};
        data.LeadDetails.forEach(leadDetail => {
            Object.keys(leadDetail.Heading).forEach(_ => {
                result[leadDetail.Heading.name] = leadDetail.data
            });
        });

        return { statusCode: 200, data: result };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, error: "Internal Server Error" };
    }
}

    
async function getSearch(req) {
    const { companyId, active } = req.query
    const { searchKey } = req.params
    const data = await prisma.leadMaster.findMany({
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


export async function importLead(body) {
    const { leadCategoriesId, importedData, excelFields } = await body
    function findExcelFieldHeadingWithFieldName(field) {
        const index = excelFields.findIndex(i => i.name === field)
        if (index === -1) return null;
        return excelFields[index]?.headingId ? parseInt(excelFields[index].headingId) : null
    }
    let data;
    await prisma.$transaction(async (tx) => {
        const leadImportData = await tx.leadImport.create({
            data: {
                leadCategoriesId: parseInt(leadCategoriesId)
            },
        });
        await async function createLeads() {
            const promises = importedData.map(async (lead) => {
                const leadMasterData = await tx.leadMaster.create({
                    data: {
                        leadImportId: parseInt(leadImportData.id),
                    }
                })
                await async function createLeadDetails() {
                    let leadDetails = Object.keys(lead).map(key => ({
                        leadMasterId: parseInt(leadMasterData.id),
                        headingId: findExcelFieldHeadingWithFieldName(key),
                        data: lead[key]
                    }))
                    leadDetails = leadDetails.filter(i => i.headingId)
                    const promises = leadDetails.map(async (ld) => {
                        return await tx.leadDetails.create({
                            data: ld
                        })
                    })
                    return Promise.all(promises)
                }()
            })
            return Promise.all(promises);
        }()
    })

    return { statusCode: 0, data };
}


async function create(body) {
    const { leadCategoriesId, importedData, excelFields } = await body
    const data = await prisma.leadMaster.create({
        data: {
            aliasName, leadMasterItemId: parseInt(leadMasterItemId), hsn, leadMasterCategory,
            active, companyId: parseInt(companyId)
        },
    });
    return { statusCode: 0, data };
}


async function update(id, body) {
    const { aliasName, leadMasterItemId, hsn, leadMasterCategory, active, companyId } = await body
    const dataFound = await prisma.leadMaster.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("leadMaster");
    const data = await prisma.leadMaster.update({
        where: {
            id: parseInt(id),
        },
        data: {
            aliasName, leadMasterItemId: parseInt(leadMasterItemId), hsn, leadMasterCategory,
            active, companyId: parseInt(companyId)
        },
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.leadMaster.delete({
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
