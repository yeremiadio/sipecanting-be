"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../../controllers/fileController/index.js");
const authenticateJWT_1 = require("../../middlewares/authenticateJWT.js");
const multerConfig_1 = __importDefault(require("../../utils/multerConfig.js"));
const fileRoutes = (0, express_1.Router)();
fileRoutes.post('/upload', multerConfig_1.default.single('file'), authenticateJWT_1.authenticateJWT, fileController_1.storeSingleFile);
fileRoutes.post('/upload-multiple', multerConfig_1.default.array('files'), fileController_1.storeMultipleFiles);
fileRoutes.get('/:filename', fileController_1.getFile);
exports.default = fileRoutes;
//# sourceMappingURL=index.js.map