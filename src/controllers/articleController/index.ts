import { Request, Response } from 'express'
import { createArticle as createArticleService, deleteArticleById as deleteArticleByIdService, getArticleById as getArticleByIdService, getArticles as getArticlesService } from '@/services/articleService'
import { formatResponse } from '@/utils/formatResponse';
import { Article } from '@prisma/client';

export const createArticle = async (req: Request, res: Response) => {
    try {
        const { file, content, title } = req.body;
        const group = await createArticleService({ content, title, file });
        res.status(201).json(group);
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
        res.status(400).json({ error: "Failed Please try again" });
    }
}
