import { Router } from 'express';
import { getUserById, getUsers } from 'controllers/userController';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);

export default userRoutes;