"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
// import { updateGroupMembers } from "../groupService/index.js";
const sendMessage = async (content, groupId, userId) => {
    try {
        // const restIds = groups?.users.map((item) => (item.id)) ?? []
        // await updateGroupMembers(groupId, [...new Set([...restIds, userId])], [])
        const message = await prisma_1.default.message.create({
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
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map