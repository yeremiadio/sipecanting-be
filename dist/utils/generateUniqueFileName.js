"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueFilename = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
// Helper function to convert UUID to a shorter base64 string
const shortenUUID = (uuid) => {
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    return buffer.toString('base64').replace(/=/g, ''); // Remove padding
};
/**
 * Generate a unique filename using a UUID, current timestamp, and the original file extension.
 * @param originalName The original filename including extension.
 * @returns A unique filename with a timestamp and the same extension as the original file.
 */
const generateUniqueFilename = (originalName) => {
    if (!originalName)
        return "";
    const extension = path_1.default.extname(originalName); // Get the original file extension
    const baseName = path_1.default.basename(originalName, extension).replace(/ /g, "_"); // Get the file name without extension
    const fullUUID = (0, uuid_1.v4)(); // Generate a UUID
    const shortenedUUID = shortenUUID(fullUUID); // Shorten the UUID
    // Combine original name, shortened UUID, timestamp, and extension
    return `${baseName}_${shortenedUUID}${extension}`;
};
exports.generateUniqueFilename = generateUniqueFilename;
//# sourceMappingURL=generateUniqueFileName.js.map