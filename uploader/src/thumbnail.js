import path from "path";
import { createReadStream, createWriteStream } from "fs";
import gm from "gm";
import sizeOf from "image-size";

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
        const dest = path.resolve("../files/thumbnail/" + "thumb-" + filename);
        const writeStream = createWriteStream(dest);
        stdout.pipe(writeStream);
        resolve({ dest });
      });
  });

export { thumbnail, saveBuffer };
