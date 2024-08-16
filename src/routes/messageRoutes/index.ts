import { Router } from 'express';

import { sendMessage } from '@/controllers/messageController';

const messageRoutes = Router();

messageRoutes.post('/', sendMessage);

export default messageRoutes;
