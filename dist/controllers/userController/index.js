"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailByUserId = exports.createUserDetailByUserId = exports.getUserById = exports.getUsers = void 0;
const userService_1 = require("../../services/userService");
const formatResponse_1 = require("../../utils/formatResponse");
const getUsers = async (_, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json((0, formatResponse_1.formatResponse)({
            data: users,
            statusCode: res.statusCode,
            message: "Successfully fetched users"
        }));
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); // Parse userId from URL params
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await (0, userService_1.getUserById)(userId);
        res.status(200).json((0, formatResponse_1.formatResponse)({
            data: user,
            statusCode: res.statusCode,
            message: "Successfully fetched user"
        }));
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserById = getUserById;
const createUserDetailByUserId = async (req, res) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await (0, userService_1.getUserById)(userId);
        if (!user)
            return res.status(400).json({ error: 'Invalid user ID' });
        const userDetail = await (0, userService_1.createUserDetail)({ userId: user.id, ...req.body });
        res.status(201).json(userDetail);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        throw error;
    }
};
exports.createUserDetailByUserId = createUserDetailByUserId;
const getUserDetailByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); // Parse userId from URL params
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await (0, userService_1.getUserDetailById)(userId);
        res.status(200).json((0, formatResponse_1.formatResponse)({
            data: user,
            statusCode: res.statusCode,
            message: "Successfully fetched user detail"
        }));
    }
    catch (error) {
        console.error('Error fetching user detail:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserDetailByUserId = getUserDetailByUserId;
//# sourceMappingURL=index.js.map