const { resolve } = require("path");
const prompt = require("prompt");

const path = resolve("./");

const thumbnail = require("./thumbnail");
const schema = require("./schema");
const asyncExec = require("./asyncExec");
const asyncPrompt = require("./asyncPrompt");
const save = require("./save");

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
        const filepaths = await thumbnail(paths);
        const payload = await save(filepaths);
        console.log({ payload });
        break;
      default:
        process.exit(0);
    }
  } catch (e) {
    throw new Error(e);
  }
};

init();
