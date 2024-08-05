"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("@/services/authService");
const register = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await (0, authService_1.registerUser)(email, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        throw error;
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, authService_1.loginUser)(email, password);
        res.json(user);
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
    }
};
exports.login = login;
//# sourceMappingURL=index.js.map