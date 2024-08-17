import { Router } from 'express';

import { authenticateJWT } from '@/middlewares/authenticateJWT';

import articleRoutes from './articleRoutes';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import fileRoutes from './fileRoutes';
import groupRoutes from './groupRoutes';
import messageRoutes from './messageRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', authenticateJWT, userRoutes);
router.use('/groups', authenticateJWT, groupRoutes);
router.use('/categories', authenticateJWT, categoryRoutes);
router.use('/articles', authenticateJWT, articleRoutes);
router.use('/messages', authenticateJWT, messageRoutes);
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);

export default router;