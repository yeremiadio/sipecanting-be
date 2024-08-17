import { Request, Response } from 'express'
import { createArticle as createArticleService, deleteArticleById as deleteArticleByIdService, getArticleById as getArticleByIdService, getArticles as getArticlesService, updateArticle as updateArticleService } from '@/services/articleService'
import { formatResponse } from '@/utils/formatResponse';
import { Article } from '@prisma/client';
import { IAuthRequest } from '@/middlewares/authenticateJWT';

export const createArticle = async (req: IAuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.id) res.status(400).json({ error: "User is missing! Please try again" })
        const userId = req.user?.id ?? 0;
        const { content, title, categoryId, caption, } = req.body;
        const data = await createArticleService({ content, title, authorId: userId, categoryId, caption }, req.file!);
        res.status(201).json(data);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed! Please try again." });
    }
}
export const updateArticleById = async (req: Request, res: Response) => {
    try {
        const { content, title, categoryId, caption } = req.body
        const articleId = req.params.id;
        if (!articleId) res.status(404).json({ error: "Article not found." });
        const data = await updateArticleService(Number(articleId), {
            content, title, categoryId, caption
        }, req.file!)
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed! Please try again." });
    }
}

export const getArticles = async (_: Request, res: Response) => {
    try {
        const data = await getArticlesService();
        if (!data) {
            return res.status(404).json({ error: 'Articles not found' });
        }
        res.status(200).json(formatResponse<Article[]>({
            data: data,
            statusCode: res.statusCode,
            message: "Successfully fetched articles"
        }));
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await getArticleByIdService(Number(id));
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
}

export const deleteArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await deleteArticleByIdService(Number(id));
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Article not found! Please try again" });
    }
}
