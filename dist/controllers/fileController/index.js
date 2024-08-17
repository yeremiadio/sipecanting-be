"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMultipleFiles = exports.storeSingleFile = exports.getFile = void 0;
const fileService_1 = require("../../services/fileService/index.js");
const getFile = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const fileData = await (0, fileService_1.getFile)(fileName);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(fileData);
    }
    catch (error) {
        res.status(404).json({ message: 'File not found' });
    }
};
exports.getFile = getFile;
const storeSingleFile = async (req, res) => {
    try {
        const storedFile = await (0, fileService_1.storeFile)(req.file);
        res.status(200).json({ message: 'File uploaded successfully', file: storedFile?.secure_url });
    }
    catch (error) {
        res.status(400).json({ message: "Error! Please try again." });
        throw new Error("File not found");
    }
};
exports.storeSingleFile = storeSingleFile;
const storeMultipleFiles = async (req, res) => {
    try {
        const storedFiles = await (0, fileService_1.storeMultipleFiles)(req.files);
        res.status(200).json({ message: 'Files uploaded successfully', files: storedFiles });
    }
    catch (error) {
        res.status(400).json({ message: "Error! Please try again." });
        throw new Error("Files not found");
    }
};
exports.storeMultipleFiles = storeMultipleFiles;
//# sourceMappingURL=index.js.map