import prisma from "@/utils/prisma";

export const sendMessage = async (content: string, groupId: number, userId: number) => {
    const message = await prisma.message.create({
        data: {
            content,
            groupId,
            userId,
        },
        include: {
            userDetail: true,
            group: true,
        },
    });

    return message;
};