"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.storeMultipleFiles = exports.storeFile = void 0;
const cloudinaryConfig_1 = __importDefault(require("../../utils/cloudinaryConfig.js"));
const generateUniqueFileName_1 = require("../../utils/generateUniqueFileName.js");
// Store the file's binary data in the database
const storeFile = async (file) => {
    if (!file)
        throw new Error('File not found');
    try {
        const cloudinary = await (0, cloudinaryConfig_1.default)();
        const storedFile = await cloudinary.uploader.upload(file.path, {
            filename_override: (0, generateUniqueFileName_1.generateUniqueFilename)(file.filename),
            folder: 'sipecanting',
            eager_async: true,
            resource_type: 'auto',
        });
        return storedFile;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed upload to the server");
    }
};
exports.storeFile = storeFile;
// Store the binary data for multiple files in the database with unique filenames
const storeMultipleFiles = async (files) => files.map(async (file) => await (0, exports.storeFile)(file));
exports.storeMultipleFiles = storeMultipleFiles;
// Retrieve the file's binary data from the database
const getFile = async (fileName) => {
    const cloudinary = await (0, cloudinaryConfig_1.default)();
    const file = cloudinary.url(fileName, { width: 100, height: 150, crop: "fill" });
    if (!file) {
        throw new Error('File not found');
    }
    return file;
};
exports.getFile = getFile;
//# sourceMappingURL=index.js.map