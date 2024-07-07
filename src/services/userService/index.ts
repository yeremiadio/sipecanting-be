import { IUser } from "types/user";
import prisma from "utils/prisma";

export const getAllUsers = async (): Promise<IUser[]> => {
    return prisma.user.findMany();
};

export const getUserById = async (userId: number) => {
    return prisma.user.findUnique({ where: { id: userId } });
};