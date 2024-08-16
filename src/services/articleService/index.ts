import prisma from "@/utils/prisma";
import { Article } from "@prisma/client";
import { storeCloudinaryFile } from "@/utils/storeCloudinaryFile";

type TArticleWithFile = Pick<Article, 'content' | 'title' | 'authorId' | 'categoryId'>

export const createArticle = async ({ content, title, authorId, categoryId }: TArticleWithFile, file: Express.Multer.File) => {
    try {
        const fileResponse = await storeCloudinaryFile(file!);
        const data = await prisma.article.create({
            data: {
                content,
                title,
                authorId,
                categoryId: Number(categoryId),
                thumbnailImage: fileResponse?.secure_url
            },
        });
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Failed")
    }
};

export const updateArticle = async (id: number, { categoryId, content,
    title,
    authorId,
}: Partial<TArticleWithFile>, file: Express.Multer.File) => {
    try {
        const fileResponse = await storeCloudinaryFile(file);
        const data = prisma.article.update({
            where: { id },
            data: {
                content,
                title,
                authorId,
                categoryId: Number(categoryId),
                thumbnailImage: fileResponse?.secure_url,
            },
        });
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error while updating article. Please try again")
    }
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