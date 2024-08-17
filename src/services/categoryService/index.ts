import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  return prisma.category.create({
    data,
  });
};

export const getAllCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const updateCategory = async (id: number, data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Category> => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: number): Promise<Category> => {
  return prisma.category.delete({
    where: { id },
  });
};
