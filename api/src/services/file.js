import path from "path";
import { writeFileSync } from "fs";
import multer from "multer";
import errorResponse from "../responses/errorResponses";

const storage = multer.memoryStorage();

const extractFiles = multer({
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
    mimetype && ext ? cb(null, true) : cb(errorResponse.invalidFileType, false);
  },
  storage
}).array("data", 25);

const writeFileAsync = (dest, buffer) =>
  Promise.resolve(writeFileSync(dest, buffer, "base64"));

const saveBuffer = file =>
  new Promise(async (resolve, reject) => {
    let filepath = "/assets/originals/" + Date.now() + "-" + file.originalname;

    try {
      await writeFileAsync(filepath, file.buffer);
      resolve({ filepath });
    } catch (e) {
      reject(e);
    }
  });

const save = files =>
  new Promise(async (resolve, reject) => {
    let filepaths = new Array();

    try {
      for (let file of files) {
        const { filepath } = await saveBuffer(file);
        filepaths.push(filepath);
      }
      resolve(filepaths);
    } catch (e) {
      reject(e);
    }
  });

const validateFiles = files =>
  new Promise((resolve, reject) => {
    if (!files) reject(errorResponse.invalidRequest);
    if (files.length <= 0) reject(errorResponse.invalidRequest);
    if (!Array.isArray(files)) reject(errorResponse.invalidRequest);
    resolve(files);
  });

export default { extractFiles, save, validateFiles };
