"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateJWT_1 = require("../middlewares/authenticateJWT.js");
const articleRoutes_1 = __importDefault(require("./articleRoutes/index.js"));
const authRoutes_1 = __importDefault(require("./authRoutes/index.js"));
const fileRoutes_1 = __importDefault(require("./fileRoutes/index.js"));
const groupRoutes_1 = __importDefault(require("./groupRoutes/index.js"));
const messageRoutes_1 = __importDefault(require("./messageRoutes/index.js"));
const userRoutes_1 = __importDefault(require("./userRoutes/index.js"));
const router = (0, express_1.Router)();
router.use('/users', authenticateJWT_1.authenticateJWT, userRoutes_1.default);
router.use('/groups', authenticateJWT_1.authenticateJWT, groupRoutes_1.default);
router.use('/articles', authenticateJWT_1.authenticateJWT, articleRoutes_1.default);
router.use('/messages', authenticateJWT_1.authenticateJWT, messageRoutes_1.default);
router.use('/auth', authRoutes_1.default);
router.use('/files', fileRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map