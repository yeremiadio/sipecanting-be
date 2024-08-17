import prisma from "@/utils/prisma";
import { Group } from "@prisma/client";

export const createGroup = async (name: string, userIds: number[]) => {
    const group = await prisma.group.create({
        data: {
            name,
            users: {
                connect: userIds.map((id) => ({ id })),
            },
        },
    });

    return group;
};

export const updateGroupMembers = async (groupId: number, addUserIds: number[], removeUserIds: number[]) => {
    const group = await prisma.group.update({
        where: { id: groupId },
        data: {
            users: {
                connect: addUserIds.map((id) => ({ id })),
                disconnect: removeUserIds.map((id) => ({ id })),
            },
        },
        include: {
            users: true,
        },
    });

    return group;
};

export const getAllGroups = async (): Promise<Group[]> => {
    return prisma.group.findMany({
        include: {
            users: {
                select: {
                    id: true,
                }
            },
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1, // Only take the newest message
            },
        }
    });
};

export const getGroupById = async (id: number) => {
    const group = await prisma.group.findUnique({
        where: { id },
        include: {
            users: { select: { id: true } },
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: {
                        select: {
                            UserDetail: {
                                select: {
                                    fullName: true, shortName: true,
                                    profileImage: true,
                                    userId: true,
                                }
                            },

                        }
                    },
                },
            },
        },
    });

    if (!group) throw new Error('Group not found');

    return group;
};

export const deleteGroupById = async (groupId: number) => {
    const group = await prisma.group.delete({
        where: {
            id: groupId,
        },
    })
    return group;
}
