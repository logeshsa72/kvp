import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function create(body) {
    const { createdById, selectedUser, selectedData } = body;
    console.log(selectedData,'selectedData')

    const data = await prisma.allocation.create({
        data: {
            userId: selectedUser ? parseInt(selectedUser) : undefined,
            createdById: createdById ? parseInt(createdById) : undefined,
            allocationDetail: {
                createMany: {
                    data: selectedData.map(item => ({
                        leadMasterId: parseInt(item),
                    })),
                },
            },
        },
    });

    return { statusCode: 0, data };
 
}


async function get(req) {
    const { userId } = req.query;

    try {
        let data = await prisma.allocationDetail.findMany({
            where: {
                Allocation: {
                    userId: parseInt(userId)
                },
                 LeadMaster:{
                    OR:[
                        {report: null},
                        {AND:[
                            {report: "FOLLOWUP"},
                            {followupDate: {
                                lte: new Date()
                            }}
                        ]}
                    ]
                 }
            },
            include: {
                Allocation: true,
                LeadMaster: {
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
                }
            },
        });

        console.log(data, 'data');

        data = data.map(lead => {
            let newItem = { id: lead.leadMasterId };
            lead.LeadMaster.LeadDetails.forEach(i => {
                newItem[i.Heading.name] = i.data;
            });
            return newItem;
        });
   
        return { statusCode: 0, data };
    } catch (error) {
        console.error(error);
        return { statusCode: 1, error: "Error" };
    }
}


export { create,   get };
