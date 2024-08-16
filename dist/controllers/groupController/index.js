"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroupById = exports.getGroupById = exports.getGroups = exports.updateGroupMembers = exports.createGroup = void 0;
const groupService_1 = require("../../services/groupService/index.js");
const formatResponse_1 = require("../../utils/formatResponse.js");
const createGroup = async (req, res) => {
    try {
        const { name, userIds } = req.body;
        const group = await (0, groupService_1.createGroup)(name, userIds);
        res.status(201).json(group);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed! Please try again." });
    }
};
exports.createGroup = createGroup;
const updateGroupMembers = async (req, res) => {
    try {
        const { groupId, addUserIds, removeUserIds } = req.body;
        const group = await (0, groupService_1.updateGroupMembers)(groupId, addUserIds, removeUserIds);
        res.status(201).json(group);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed! Please try again." });
    }
};
exports.updateGroupMembers = updateGroupMembers;
const getGroups = async (_, res) => {
    try {
        const data = await (0, groupService_1.getAllGroups)();
        if (!data) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json((0, formatResponse_1.formatResponse)({
            data: data,
            statusCode: res.statusCode,
            message: "Successfully fetched groups"
        }));
    }
    catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getGroups = getGroups;
const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await (0, groupService_1.getGroupById)(Number(id));
        res.json(group);
    }
    catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
};
exports.getGroupById = getGroupById;
const deleteGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await (0, groupService_1.deleteGroupById)(Number(id));
        res.json(group);
    }
    catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
};
exports.deleteGroupById = deleteGroupById;
//# sourceMappingURL=index.js.map