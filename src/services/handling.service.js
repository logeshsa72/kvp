import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';

const prisma = new PrismaClient()


async function get(req) {
    const data = await prisma.heading.findMany();
    return { statusCode: 0, data };
}


async function getOne(id) {
    
    const childRecord = 0;
    const data = await prisma.heading.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!data) return NoRecordFound("leadCategories");
    return { statusCode: 0, data: {...data, ...{childRecord}} };
}

async function getSearch(req) {
    const { searchKey } = req.params
    const { companyId, active } = req.query
    const data = await prisma.leadCategories.findMany({
        where: {
            companyId: companyId ? parseInt(companyId) : undefined,
            active: active ? Boolean(active) : undefined,
            OR: [
                {
                    name: {
                        contains: searchKey,
                    },
                },
                {
                    code: {
                        contains: searchKey,
                    },
                },
            ],
        }
    })
    return { statusCode: 0, data: data };
}

async function create(body) {
    const { name ,active} = await body
    const data = await prisma.heading.create(
        {
            data: {
                name: name, 
                active,
            }
        }
    )
    return { statusCode: 0, data };
}

async function update(id, body) {
    const { name, active } = await body
    const dataFound = await prisma.heading.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("headingCategories");
    const data = await prisma.heading.update({
        where: {
            id: parseInt(id),
        },
        data:
        {
           name: name,
           active
        },
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.heading.delete({
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
