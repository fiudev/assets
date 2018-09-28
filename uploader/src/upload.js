import path from "path";
import { createReadStream, createWriteStream, writeFileSync } from "fs";
import gm from "gm";
import multer from "multer";
import sizeOf from "image-size";

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

const saveBuffer = ({ originalname, buffer }) =>
  new Promise(async resolve => {
    let dest = path.resolve("tmp/original/" + originalname);
    await writeFileAsync(dest, buffer);
    resolve({ dest });
  });

const asyncSizeOf = dest => Promise.resolve(sizeOf(dest));

const thumbDimensions = path =>
  new Promise(async resolve => {
    const { width } = await asyncSizeOf(path);

    switch (width) {
      case 4000:
        resolve(Math.floor(width * 0.3));
        break;
      case width > 2049 && width <= 3999:
        resolve(Math.floor(width * 0.4));
        break;
      case width > 1025 && width <= 2048:
        resolve(Math.floor(width * 0.5));
        break;
      default:
        resolve(Math.floor(width * 0.5));
        break;
    }
  });

const thumbnail = filepath =>
  new Promise(async (resolve, reject) => {
    const width = await thumbDimensions(filepath);

    const readStream = createReadStream(filepath);
    gm(readStream)
      .filter("blackman")
      .type("trueColor")
      .quality(90)
      .gravity("center")
      .strip()
      .noProfile()
      .interlace("none")
      .resize(width)
      .stream((err, stdout) => {
        if (err) reject(err);

        const filename = filepath.replace(/^.*[\\\/]/, "");
        const dest = path.resolve("tmp/thumb/" + filename);
        const writeStream = createWriteStream(dest);
        stdout.pipe(writeStream);
        resolve({ dest });
      });
  });

export { extractFiles, thumbnail, saveBuffer };
