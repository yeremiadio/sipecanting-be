"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
const sendMessage = async (content, groupId, userId) => {
    const message = await prisma_1.default.message.create({
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
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map