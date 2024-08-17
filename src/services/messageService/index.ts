import prisma from "@/utils/prisma";

export const sendMessage = async (content: string, groupId: number, userId: number) => {
    
    const message = await prisma.message.create({
        data: {
            content,
            groupId,
            userId,
        },
        include: {
            user: true,
            group: true,
        },
    });

    return message;
};