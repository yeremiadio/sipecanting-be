import getCloudinary from "./cloudinaryConfig";
import { generateUniqueFilename } from "./generateUniqueFileName";
import fs from 'fs';

export const storeCloudinaryFile = async (file: Express.Multer.File) => {
    if (!file) throw new Error('File not found')
    try {
        const cloudinary = await getCloudinary()
        const storedFile = await cloudinary.uploader.upload(file.path, {
            filename_override: generateUniqueFilename(file.filename),
            folder: 'sipecanting',
            eager_async: true,
            resource_type: 'auto',
        });
        // Remove the file from the server after upload
        fs.unlinkSync(file.path);
        return storedFile;
    } catch (error) {
        console.log(error)
        throw new Error("Failed upload to the server")
    }
}