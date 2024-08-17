"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (data) => {
    return prisma.category.create({
        data,
    });
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    return prisma.category.findMany();
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    return prisma.category.findUnique({
        where: { id },
    });
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (id, data) => {
    return prisma.category.update({
        where: { id },
        data,
    });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    return prisma.category.delete({
        where: { id },
    });
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=index.js.map