"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleById = exports.getArticleById = exports.getArticles = exports.updateArticle = exports.createArticle = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
const storeCloudinaryFile_1 = require("../../utils/storeCloudinaryFile.js");
const createArticle = async ({ content, title, authorId, categoryId, caption }, file) => {
    try {
        const fileResponse = await (0, storeCloudinaryFile_1.storeCloudinaryFile)(file);
        const data = await prisma_1.default.article.create({
            data: {
                content,
                title,
                authorId,
                caption,
                categoryId: Number(categoryId),
                thumbnailImage: fileResponse?.secure_url
            },
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed");
    }
};
exports.createArticle = createArticle;
const updateArticle = async (id, { categoryId, content, title, authorId, caption }, file) => {
    try {
        const fileResponse = await (0, storeCloudinaryFile_1.storeCloudinaryFile)(file);
        const data = prisma_1.default.article.update({
            where: { id },
            data: {
                content,
                title,
                authorId,
                caption,
                categoryId: Number(categoryId),
                thumbnailImage: fileResponse?.secure_url,
            },
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while updating article. Please try again");
    }
};
exports.updateArticle = updateArticle;
const getArticles = async () => {
    return prisma_1.default.article.findMany({
        include: {
            category: true,
            user: {
                select: {
                    email: true,
                    UserDetail: {
                        select: {
                            fullName: true,
                            shortName: true,
                        }
                    }
                }
            }
        }
    });
};
exports.getArticles = getArticles;
const getArticleById = async (id) => {
    const article = await prisma_1.default.article.findUnique({
        where: { id },
        include: {
            category: true,
            user: {
                select: {
                    email: true,
                    UserDetail: {
                        select: {
                            fullName: true,
                            shortName: true,
                        }
                    }
                }
            }
        },
    });
    if (!article)
        throw new Error('Article not found');
    return article;
};
exports.getArticleById = getArticleById;
const deleteArticleById = async (id) => {
    const group = await prisma_1.default.article.delete({
        where: {
            id: id,
        },
    });
    return group;
};
exports.deleteArticleById = deleteArticleById;
//# sourceMappingURL=index.js.map