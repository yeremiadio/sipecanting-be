"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const messageService_1 = require("../../services/messageService/index.js");
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
const sendMessage = async (req, res) => {
    try {
        const { content, groupId } = req.body;
        if (!req.user || !req.user.id)
            res.status(400).json({ error: "User is missing! Please try again" });
        const userId = req.user?.id ?? 0;
        const isMember = await prisma_1.default.group.findFirst({
            where: {
                users: { some: { id: userId } },
                id: parseInt(groupId)
            },
        });
        if (!isMember)
            return res.status(403).json({ error: "User is not member" });
        const message = await (0, messageService_1.sendMessage)(content, groupId, userId);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(400).json({ error: "Failed! Please try again" });
        console.log(error);
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map