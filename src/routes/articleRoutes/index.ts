import { Router } from 'express';

import {
    createArticle, deleteArticleById, getArticleById, getArticles
} from '@/controllers/articleController';

const articleRoutes = Router();

articleRoutes.post('/', createArticle);
articleRoutes.delete('/:id', deleteArticleById);
articleRoutes.get('/', getArticles);
articleRoutes.get('/:id', getArticleById);

export default articleRoutes;
