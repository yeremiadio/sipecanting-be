import { Router } from 'express';
import { getFile, storeMultipleFiles, storeSingleFile } from '@/controllers/fileController';
import multer from 'multer';
import { authenticateJWT } from '@/middlewares/authenticateJWT';

const fileRoutes = Router();
const upload = multer();

fileRoutes.post('/upload', upload.single('file'), authenticateJWT, storeSingleFile);
fileRoutes.post('/upload-multiples', upload.array('files'), authenticateJWT, storeMultipleFiles);
fileRoutes.get('/:filename', getFile);

export default fileRoutes;