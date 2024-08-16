"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const messageService_1 = require("../../services/messageService/index.js");
const sendMessage = async (req, res) => {
    try {
        const { content, groupId } = req.body;
        if (!req.user || !req.user.id)
            res.status(400).json({ error: "User is missing! Please try again" });
        const userId = req.user?.id ?? 0;
        const message = await (0, messageService_1.sendMessage)(content, groupId, userId);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(400).json({ error: "Failed! Please try again" });
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map