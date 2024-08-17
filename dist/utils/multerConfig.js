"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        filename: (_, file, cb) => {
            const randomString = crypto_1.default.randomBytes(16).toString("hex");
            cb(null, `${randomString}.${file.mimetype.split('/')[1]}`);
        }
    }),
    fileFilter: (_, __, cb) => {
        cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    dest: 'uploads/'
});
exports.default = upload;
//# sourceMappingURL=multerConfig.js.map