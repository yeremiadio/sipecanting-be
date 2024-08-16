import { Router } from 'express';

import { authenticateJWT } from '@/middlewares/authenticateJWT';

import authRoutes from './authRoutes';
import fileRoutes from './fileRoutes';
import groupRoutes from './groupRoutes';
import messageRoutes from './messageRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', authenticateJWT, userRoutes);
router.use('/groups', authenticateJWT, groupRoutes);
router.use('/messages', authenticateJWT, messageRoutes);
router.use('/auth', authRoutes);
router.use('/files', authenticateJWT, fileRoutes);

export default router;