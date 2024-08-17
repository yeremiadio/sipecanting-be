import prisma from "@/utils/prisma";
// import { updateGroupMembers } from "../groupService";

export const sendMessage = async (content: string, groupId: number, userId: number) => {
    try {
        // const restIds = groups?.users.map((item) => (item.id)) ?? []
        // await updateGroupMembers(groupId, [...new Set([...restIds, userId])], [])
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
    } catch (error) {
        console.log(error)
    }
};