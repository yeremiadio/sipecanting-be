import { IAuthRequest } from '@/middlewares/authenticateJWT';
import { sendMessage as sendMessageService } from '@/services/messageService';
import prisma from '@/utils/prisma';
import { Response } from 'express';

export const sendMessage = async (req: IAuthRequest, res: Response) => {
    try {
        const { content, groupId } = req.body;
        if (!req.user || !req.user.id) res.status(400).json({ error: "User is missing! Please try again" })
        const userId = req.user?.id ?? 0;
        const isMember = await prisma.group.findFirst({
            where: {
                users: { some: { id: userId } },
                id: parseInt(groupId)
            },
        });
        if (!isMember) return res.status(403).json({ error: "User is not member" })
        const message = await sendMessageService(content, groupId, userId);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: "Failed! Please try again" });
        console.log(error)
    }
}