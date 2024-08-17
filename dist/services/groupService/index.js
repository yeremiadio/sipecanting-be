"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroupById = exports.getGroupById = exports.getAllGroups = exports.updateGroupMembers = exports.createGroup = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
const createGroup = async (name, userIds) => {
    const group = await prisma_1.default.group.create({
        data: {
            name,
            users: {
                connect: userIds.map((id) => ({ id })),
            },
        },
    });
    return group;
};
exports.createGroup = createGroup;
const updateGroupMembers = async (groupId, addUserIds, removeUserIds) => {
    const group = await prisma_1.default.group.update({
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
exports.updateGroupMembers = updateGroupMembers;
const getAllGroups = async () => {
    return prisma_1.default.group.findMany({
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
exports.getAllGroups = getAllGroups;
const getGroupById = async (id) => {
    const group = await prisma_1.default.group.findUnique({
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
    if (!group)
        throw new Error('Group not found');
    return group;
};
exports.getGroupById = getGroupById;
const deleteGroupById = async (groupId) => {
    const group = await prisma_1.default.group.delete({
        where: {
            id: groupId,
        },
    });
    return group;
};
exports.deleteGroupById = deleteGroupById;
//# sourceMappingURL=index.js.map