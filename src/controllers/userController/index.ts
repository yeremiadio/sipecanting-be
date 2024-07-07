import { Request, Response } from 'express';
import { getAllUsers, getUserById as getUserByIdService } from "services/userService";
import { Nullable } from 'types';
import { IUser } from 'types/user';
import { formatResponse } from 'utils/formatResponse';

export const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(formatResponse<IUser[]>({
            data: users,
            statusCode: res.statusCode,
            message: "Successfully fetched users"
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10); // Parse userId from URL params
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = await getUserByIdService(userId);
        res.status(200).json(formatResponse<Nullable<IUser>>({
            data: user,
            statusCode: res.statusCode,
            message: "Successfully fetched user"
        }));
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};