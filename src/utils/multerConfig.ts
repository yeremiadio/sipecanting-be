import multer from 'multer';
import crypto from 'crypto';
const upload = multer({
    storage: multer.diskStorage({
        filename: (_, file, cb) => {
            const randomString = crypto.randomBytes(16).toString("hex");
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

export default upload;
