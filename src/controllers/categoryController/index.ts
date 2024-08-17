import { Request, Response } from 'express';
import * as categoryService from '@/services/categoryService';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categorys = await categoryService.getAllCategories();
        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.updateCategory(Number(req.params.id), req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await categoryService.deleteCategory(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
