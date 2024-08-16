"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../../controllers/messageController/index.js");
const messageRoutes = (0, express_1.Router)();
messageRoutes.post('/', messageController_1.sendMessage);
exports.default = messageRoutes;
//# sourceMappingURL=index.js.map