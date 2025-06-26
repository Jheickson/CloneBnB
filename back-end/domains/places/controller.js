import "dotenv/config";
import fs from "fs";
import download from "image-downloader";
import mime from "mime-types";
import multer from "multer";
import {__dirname} from "../../server.js";

const getExtension = (path) => {
    const mimeType = mime.lookup(path);
    const contentType = mime.contentType(mimeType);
    const extension = mime.extension(contentType);

    return {extension, mimeType};
};

// ⚠️ EDITADO: agora só retorna o caminho local
export const sendToS3 = async (filename, path, mimetype) => {
    return `http://localhost:3001/tmp/${filename}`;
};

export const downloadImage = async (link) => {
    const {extension, mimeType} = getExtension(link);
    const destination = `${__dirname}/tmp/`;

    const filename = `${Date.now()}.${extension}`;
    const fullPath = `${destination}${filename}`;

    try {
        const options = {
            url: link,
            dest: fullPath,
        };

        await download.image(options);

        return {filename, fullPath, mimeType};
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const uploadImage = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}/tmp/`);
        },

        filename: function (req, file, cb) {
            const {extension} = getExtension(file.originalname);
            const uniqueSuffix = Math.round(Math.random() * 1e9);

            cb(null, `${Date.now()}-${uniqueSuffix}.${extension}`);
        },
    });

    return multer({storage});
};
