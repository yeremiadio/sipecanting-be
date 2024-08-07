"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/', userController_1.getUsers);
userRoutes.get('/:userId', userController_1.getUserById);
userRoutes.get('/detail/:userId', userController_1.getUserDetailByUserId);
userRoutes.post('/detail', userController_1.createUserDetailByUserId);
exports.default = userRoutes;
//# sourceMappingURL=index.js.map