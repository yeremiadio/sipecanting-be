import { Router } from 'express';
import { getFile, storeMultipleFiles, storeSingleFile } from '@/controllers/fileController';
import multer from 'multer';

const fileRoutes = Router();
const upload = multer();

fileRoutes.post('/upload', upload.single('file'), storeSingleFile);
fileRoutes.post('/upload-multiples', upload.array('files'), storeMultipleFiles);
fileRoutes.post('/:fileName', getFile);

export default fileRoutes;