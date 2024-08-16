"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupController_1 = require("../../controllers/groupController/index.js");
const groupRoutes = (0, express_1.Router)();
groupRoutes.post('/', groupController_1.createGroup);
groupRoutes.delete('/:id', groupController_1.deleteGroupById);
groupRoutes.put('/:id/members', groupController_1.updateGroupMembers);
groupRoutes.get('/', groupController_1.getGroups);
groupRoutes.get('/:id', groupController_1.getGroupById);
exports.default = groupRoutes;
//# sourceMappingURL=index.js.map