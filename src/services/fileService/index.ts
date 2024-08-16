import { generateUniqueFilename } from '@/utils/generateUniqueFileName';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Store the file's binary data in the database
export const storeFile = async (file: Express.Multer.File) => {
  const storedFile = await prisma.file.create({
    data: {
      filename: generateUniqueFilename(file.originalname),
      data: file.buffer, // Save the binary data
    },
  });

  return storedFile;
};

// Store the binary data for multiple files in the database with unique filenames
export const storeMultipleFiles = async (files: Express.Multer.File[]) => {
  const storedFiles = await prisma.$transaction(
    files.map((file) =>
      prisma.file.create({
        data: {
          filename: generateUniqueFilename(file.originalname),
          data: file.buffer,
        },
      })
    )
  );

  return storedFiles;
};

// Retrieve the file's binary data from the database
export const getFile = async (fileName: string) => {
  const file = await prisma.file.findUnique({
    where: { filename: fileName },
  });

  if (!file) {
    throw new Error('File not found');
  }

  return file.data;
};
