"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const categoryService = __importStar(require("../../services/categoryService/index.js"));
const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        const categorys = await categoryService.getAllCategories();
        res.status(200).json(categorys);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(Number(req.params.id), req.body);
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(Number(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=index.js.map