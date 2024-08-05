import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = Router();

router.use('/users', authenticateJWT, userRoutes);
router.use('/auth', authRoutes);

export default router;