import getCloudinary from '@/utils/cloudinaryConfig';
import { generateUniqueFilename } from '@/utils/generateUniqueFileName';

// Store the file's binary data in the database
export const storeFile = async (file: Express.Multer.File) => {
  if (!file) throw new Error('File not found')
  try {
    const cloudinary = await getCloudinary()
    const storedFile = await cloudinary.uploader.upload(file.path, {
      filename_override: generateUniqueFilename(file.filename),
      folder: 'sipecanting',
      eager_async: true,
      resource_type: 'auto',
    });
    return storedFile;
  } catch (error) {
    console.log(error)
    throw new Error("Failed upload to the server")
  }
};

// Store the binary data for multiple files in the database with unique filenames
export const storeMultipleFiles = async (files: Express.Multer.File[]) => files.map(async (file) => await storeFile(file))

// Retrieve the file's binary data from the database
export const getFile = async (fileName: string) => {
  const cloudinary = await getCloudinary()
  const file = cloudinary.url(fileName, { width: 100, height: 150, crop: "fill" })
  if (!file) {
    throw new Error('File not found');
  }
  return file;
};
