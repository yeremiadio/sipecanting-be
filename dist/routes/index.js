"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const router = (0, express_1.Router)();
router.use('/users', authenticateJWT_1.authenticateJWT, userRoutes_1.default);
router.use('/auth', authRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map