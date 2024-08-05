import { Router } from 'express';
import { createUserDetailByUserId, getUserById, getUserDetailByUserId, getUsers } from '@/controllers/userController';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.get('/detail/:userId', getUserDetailByUserId);
userRoutes.post('/detail', createUserDetailByUserId);

export default userRoutes;