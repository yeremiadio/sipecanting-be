"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleById = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;
const articleService_1 = require("../../services/articleService/index.js");
const formatResponse_1 = require("../../utils/formatResponse.js");
const createArticle = async (req, res) => {
    try {
        if (!req.user || !req.user.id)
            res.status(400).json({ error: "User is missing! Please try again" });
        const userId = req.user?.id ?? 0;
        const { content, title } = req.body;
        const data = await (0, articleService_1.createArticle)({ content, title, file: req.file, authorId: userId });
        res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed! Please try again." });
    }
};
exports.createArticle = createArticle;
const getArticles = async (_, res) => {
    try {
        const data = await (0, articleService_1.getArticles)();
        if (!data) {
            return res.status(404).json({ error: 'Articles not found' });
        }
        res.status(200).json((0, formatResponse_1.formatResponse)({
            data: data,
            statusCode: res.statusCode,
            message: "Successfully fetched articles"
        }));
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getArticles = getArticles;
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, articleService_1.getArticleById)(Number(id));
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
};
exports.getArticleById = getArticleById;
const deleteArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, articleService_1.deleteArticleById)(Number(id));
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Article not found! Please try again" });
    }
};
exports.deleteArticleById = deleteArticleById;
//# sourceMappingURL=index.js.map