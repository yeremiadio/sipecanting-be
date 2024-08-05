"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret';
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = payload.userId;
        const user = await (0, userService_1.getUserById)(userId);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Unauthorized' });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map