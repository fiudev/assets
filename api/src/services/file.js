import path from "path";
import { writeFileSync } from "fs";
import multer from "multer";

const storage = multer.memoryStorage();

const extractFiles = multer({
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
    mimetype && ext ? cb(null, true) : cb("Invalid filetype", false);
  },
  storage
}).array("data", 25);

const writeFileAsync = (dest, buffer) =>
  Promise.resolve(writeFileSync(dest, buffer, "base64"));

const saveBuffer = file =>
  new Promise(async resolve => {
    let filepath = path.resolve("../files/original/" + Date.now() + "-" + file.originalname);
    await writeFileAsync(filepath, file.buffer);
    resolve({ filepath });
  });

export { extractFiles, saveBuffer };
