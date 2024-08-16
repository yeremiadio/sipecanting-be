import { Router } from 'express';

import {
    createArticle, deleteArticleById, getArticleById, getArticles,
    updateArticleById
} from '@/controllers/articleController';
import upload from '@/utils/multerConfig';

const articleRoutes = Router();

articleRoutes.post('/',upload.single('thumbnailFile'), createArticle);
articleRoutes.put('/:id',upload.single('thumbnailFile'), updateArticleById);
articleRoutes.delete('/:id', deleteArticleById);
articleRoutes.get('/', getArticles);
articleRoutes.get('/:id', getArticleById);

export default articleRoutes;
