"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserDetailById = exports.createUserDetail = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("utils/prisma"));
const getAllUsers = async () => {
    return prisma_1.default.user.findMany();
};
exports.getAllUsers = getAllUsers;
const createUserDetail = async (data) => {
    return prisma_1.default.userDetail.create({
        data: {
            age: Number(data.age),
            phoneNumber: data.phoneNumber,
            userId: data.userId,
            fullName: data.fullName,
        }
    });
};
exports.createUserDetail = createUserDetail;
const getUserDetailById = async (userId) => {
    return prisma_1.default.userDetail.findUnique({ where: { userId: userId } });
};
exports.getUserDetailById = getUserDetailById;
const getUserById = async (userId) => {
    return prisma_1.default.user.findUnique({ where: { id: userId } });
};
exports.getUserById = getUserById;
//# sourceMappingURL=index.js.map