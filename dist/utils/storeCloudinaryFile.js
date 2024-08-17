"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCloudinaryFile = void 0;
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig.js"));
const generateUniqueFileName_1 = require("./generateUniqueFileName.js");
const fs_1 = __importDefault(require("fs"));
const storeCloudinaryFile = async (file) => {
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
        // Remove the file from the server after upload
        fs_1.default.unlinkSync(file.path);
        return storedFile;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed upload to the server");
    }
};
exports.storeCloudinaryFile = storeCloudinaryFile;
//# sourceMappingURL=storeCloudinaryFile.js.map