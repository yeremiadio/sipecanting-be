import { Router } from 'express';
import { register, login } from '@/controllers/authController';
import { getFile, storeMultipleFiles, storeSingleFile } from '@/controllers/fileController';

const fileRoutes = Router();

fileRoutes.post('/upload', storeSingleFile);
fileRoutes.post('/upload-multiples', storeMultipleFiles);
fileRoutes.post('/:fileName', getFile);

export default fileRoutes;