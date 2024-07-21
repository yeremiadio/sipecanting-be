import { Request, Response } from 'express';
import { registerUser, loginUser } from 'services/authService';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await registerUser(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        throw error;
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
    }
};
