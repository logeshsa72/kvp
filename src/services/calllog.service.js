import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function create(body) {
    const { allocatedDataId, commentValue, selectedDate, selectedStatus } = body;

    const parsedSelectedDate = selectedDate ? new Date(selectedDate) : null;

    let result;

    await prisma.$transaction(async (tx) => {
   
        const callLogData = await tx.callLog.create({
            data: {
                leadMasterId: allocatedDataId ? parseInt(allocatedDataId) : undefined,
                comment: commentValue,
                followupDate: parsedSelectedDate,
                report: selectedStatus,
            },
        });

        const leadMasterIdToUpdate = allocatedDataId ? parseInt(allocatedDataId) : undefined; 
        const leadMasterUpdateData = {
            comment: commentValue,
            followupDate: parsedSelectedDate,
            report: selectedStatus,
        };  

        const updatedLeadMaster = await tx.leadMaster.update({
            where: { id: leadMasterIdToUpdate },
            data: leadMasterUpdateData,
        });

        result = {
            statusCode: 0,
            callLogData,
            updatedLeadMaster,
        };
    });

    return result;
}

export {
    create
}
