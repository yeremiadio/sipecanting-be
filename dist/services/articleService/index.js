"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleById = exports.getArticleById = exports.getArticles = exports.createArticle = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma.js"));
const fileService_1 = require("../fileService/index.js");
const createArticle = async ({ content, title, file, authorId }) => {
    let filename = null;
    // If a file is uploaded, store it and get the filename
    if (file) {
        const storedFile = await (0, fileService_1.storeFile)(file);
        filename = storedFile.filename;
    }
    console.log(authorId);
    const data = await prisma_1.default.article.create({
        data: {
            content,
            title,
            authorId,
            thumbnailImage: filename,
        },
    });
    return data;
};
exports.createArticle = createArticle;
const getArticles = async () => {
    return prisma_1.default.article.findMany({
        include: {
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