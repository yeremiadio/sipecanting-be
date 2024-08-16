"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.storeMultipleFiles = exports.storeFile = void 0;
const generateUniqueFileName_1 = require("../../utils/generateUniqueFileName.js");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Store the file's binary data in the database
const storeFile = async (file) => {
    const storedFile = await prisma.file.create({
        data: {
            filename: (0, generateUniqueFileName_1.generateUniqueFilename)(file.originalname),
            data: file.buffer, // Save the binary data
        },
    });
    return storedFile;
};
exports.storeFile = storeFile;
// Store the binary data for multiple files in the database with unique filenames
const storeMultipleFiles = async (files) => {
    const storedFiles = await prisma.$transaction(files.map((file) => prisma.file.create({
        data: {
            filename: (0, generateUniqueFileName_1.generateUniqueFilename)(file.originalname),
            data: file.buffer,
        },
    })));
    return storedFiles;
};
exports.storeMultipleFiles = storeMultipleFiles;
// Retrieve the file's binary data from the database
const getFile = async (fileName) => {
    const file = await prisma.file.findUnique({
        where: { filename: fileName },
    });
    if (!file) {
        throw new Error('File not found');
    }
    return file.data;
};
exports.getFile = getFile;
//# sourceMappingURL=index.js.map