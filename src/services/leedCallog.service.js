import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    data = data.map(lead => {
        let newItem = { id: lead.id };
        lead.LeadDetails.forEach(i => {
            newItem[i.Heading.name] = i.data;
        });
        return newItem;
    });

    return { statusCode: 0, data };
}

const allocationDetails = await prisma.allocationdetail.findMany({
    where: {
        userId: yourUserId,
    },
    include: {
        allocation: true,
    },
});

export { get }; 
