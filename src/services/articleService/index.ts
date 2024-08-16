import { Nullable } from "@/types";
import prisma from "@/utils/prisma";
import { Article } from "@prisma/client";
import { storeFile } from "../fileService";

type TArticleWithFile = Pick<Article, 'content' | 'title'> & Nullable<{ file: Express.Multer.File }>

export const createArticle = async ({ content, title, file }: TArticleWithFile) => {
    let filename = null;
    // If a file is uploaded, store it and get the filename
    if (file) {
        const storedFile = await storeFile(file);
        filename = storedFile.filename;
    }
    const data = await prisma.article.create({
        data: {
            content,
            title,
            thumbnailImage: filename,
        },
    });
    return data;
};

export const getArticles = async (): Promise<Article[]> => {
    return prisma.article.findMany({
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

export const getArticleById = async (id: number) => {
    const article = await prisma.article.findUnique({
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

    if (!article) throw new Error('Article not found');

    return article;
};

export const deleteArticleById = async (id: number) => {
    const group = await prisma.article.delete({
        where: {
            id: id,
        },
    })
    return group;
}