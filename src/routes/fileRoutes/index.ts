import { Router } from 'express';
import { getFile, storeMultipleFiles, storeSingleFile } from '@/controllers/fileController';
import { authenticateJWT } from '@/middlewares/authenticateJWT';
import upload from '@/utils/multerConfig';

const fileRoutes = Router();

fileRoutes.post('/upload', upload.single('file'), authenticateJWT, storeSingleFile);
fileRoutes.post('/upload-multiple', upload.array('files'), storeMultipleFiles);
fileRoutes.get('/:filename', getFile);

export default fileRoutes;