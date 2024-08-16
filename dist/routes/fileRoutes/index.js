"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../../controllers/fileController/index.js");
const multer_1 = __importDefault(require("multer"));
const authenticateJWT_1 = require("../../middlewares/authenticateJWT.js");
const fileRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)();
fileRoutes.post('/upload', upload.single('file'), authenticateJWT_1.authenticateJWT, fileController_1.storeSingleFile);
fileRoutes.post('/upload-multiples', upload.array('files'), authenticateJWT_1.authenticateJWT, fileController_1.storeMultipleFiles);
fileRoutes.get('/:filename', fileController_1.getFile);
exports.default = fileRoutes;
//# sourceMappingURL=index.js.map