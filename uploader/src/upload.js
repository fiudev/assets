import path from "path";
import { createReadStream, createWriteStream } from "fs";
import gm from "gm";
import multer from "multer";
import sizeOf from "image-size";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve("tmp/original/")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const save = multer({
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
    mimetype && ext ? cb(null, true) : cb("Invalid filetype", false);
  },
  storage
}).array("data", 25);

const asyncSizeOf = dest => Promise.resolve(sizeOf(dest));

const thumbDimensions = path =>
  new Promise(async resolve => {
    const { width } = await asyncSizeOf(path);

    switch (width) {
      case 4000:
        resolve(Math.floor(width * 0.1));
        break;
      case width > 2049 && width <= 3999:
        resolve(Math.floor(width * 0.2));
        break;
      case width > 1025 && width <= 2048:
        resolve(Math.floor(width * 0.3));
        break;
      default:
        resolve(Math.floor(width * 0.4));
        break;
    }
  });

const thumbnail = file =>
  new Promise(async (resolve, reject) => {
    const width = await thumbDimensions(file.path);

    const readStream = createReadStream(file.path);
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

        const dest = path.resolve("tmp/thumb/" + file.filename);
        const writeStream = createWriteStream(dest);
        stdout.pipe(writeStream);
        resolve({ dest });
      });
  });

export { save, thumbnail };
