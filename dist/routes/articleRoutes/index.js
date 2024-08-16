"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../../controllers/articleController/index.js");
const multer_1 = __importDefault(require("multer"));
const articleRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)();
articleRoutes.post('/', upload.single('file'), articleController_1.createArticle);
articleRoutes.delete('/:id', articleController_1.deleteArticleById);
articleRoutes.get('/', articleController_1.getArticles);
articleRoutes.get('/:id', articleController_1.getArticleById);
exports.default = articleRoutes;
//# sourceMappingURL=index.js.map