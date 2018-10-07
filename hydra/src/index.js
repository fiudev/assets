const fs = require("fs");
const { resolve } = require("path");
const prompt = require("prompt");

const path = resolve("./");

const thumbnail = require("./thumbnail");
const schema = require("./schema");
const asyncExec = require("./asyncExec");
const asyncPrompt = require("./asyncPrompt");

prompt.start();

const init = async () => {
  try {
    const result = await asyncPrompt(schema);
    const paths = await asyncExec(path);

    switch (result.choice) {
      case "1":
        console.log(`${paths.length} images/assets.`);
        process.exit();
        break;
      case "2":
        const data = await thumbnail(paths);
        console.log(data);
        break;
      default:
        process.exit(0);
    }
  } catch (e) {
    throw new Error(e);
  }
};

init();
