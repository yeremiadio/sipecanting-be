import { Router } from 'express';

import {
    createArticle, deleteArticleById, getArticleById, getArticles,
    updateArticleById
} from '@/controllers/articleController';
import multer from 'multer';

const articleRoutes = Router();
const upload = multer()
articleRoutes.post('/', upload.single('file'), createArticle);
articleRoutes.put('/:id', upload.single('file'), updateArticleById);
articleRoutes.delete('/:id', deleteArticleById);
articleRoutes.get('/', getArticles);
articleRoutes.get('/:id', getArticleById);

export default articleRoutes;
