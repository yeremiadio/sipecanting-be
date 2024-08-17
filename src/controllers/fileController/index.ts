import { storeFile, storeMultipleFiles as storeMultipleFilesService, getFile as getFileService } from "@/services/fileService";
import { Request, Response } from 'express'



export const getFile = async (req: Request, res: Response) => {
    try {
        const fileName = req.params.filename;
        const fileData = await getFileService(fileName);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(fileData);
    } catch (error) {
        res.status(404).json({ message: 'File not found' });
    }
}

export const storeSingleFile = async (req: Request, res: Response) => {
    try {
        const storedFile = await storeFile(req.file!);
        res.status(200).json({ message: 'File uploaded successfully', file: storedFile?.secure_url });
    } catch (error) {
        res.status(400).json({ message: "Error! Please try again." });
        throw new Error("File not found")
    }
}

export const storeMultipleFiles = async (req: Request, res: Response) => {
    try {
        const storedFiles = await storeMultipleFilesService(req.files! as Express.Multer.File[]);
        res.status(200).json({ message: 'Files uploaded successfully', files: storedFiles });
    } catch (error) {
        res.status(400).json({ message: "Error! Please try again." });
        throw new Error("Files not found")
    }
}