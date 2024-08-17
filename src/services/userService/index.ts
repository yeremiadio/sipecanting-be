import { UserDetail } from "@prisma/client";
import { IUser } from "@/types/user";
import prisma from "@/utils/prisma";

export const getAllUsers = async (): Promise<IUser[]> => {
    return prisma.user.findMany();
};

export const createUserDetail = async (data: UserDetail) => {
    return prisma.userDetail.create({
        data: {
            age: Number(data.age),
            phoneNumber: data.phoneNumber,
            userId: data.userId,
            fullName: data.fullName,
            shortName: data.shortName,
        }
    });
};
export const updateUserDetail = async (userId: number, data: UserDetail) => {
    return prisma.userDetail.update({
        where: { userId },
        data: {
            age: Number(data.age),
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            shortName: data.shortName,
        }
    });
};

export const getUserDetailById = async (userId: number) => {
    return prisma.userDetail.findUnique({ where: { userId: userId } });
};

export const getUserById = async (userId: number) => {
    return prisma.user.findUnique({ where: { id: userId } });
};