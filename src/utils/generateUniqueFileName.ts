import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Helper function to convert UUID to a shorter base64 string
const shortenUUID = (uuid: string): string => {
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    return buffer.toString('base64').replace(/=/g, ''); // Remove padding
};

/**
 * Generate a unique filename using a UUID, current timestamp, and the original file extension.
 * @param originalName The original filename including extension.
 * @returns A unique filename with a timestamp and the same extension as the original file.
 */
export const generateUniqueFilename = (originalName: string): string => {
    const extension = path.extname(originalName); // Get the original file extension
    const baseName = path.basename(originalName, extension); // Get the file name without extension
    const fullUUID = uuidv4(); // Generate a UUID
    const shortenedUUID = shortenUUID(fullUUID); // Shorten the UUID
    // Combine original name, shortened UUID, timestamp, and extension
    return `${baseName}_${shortenedUUID}${extension}`;
};
