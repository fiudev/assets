const prompt = require("prompt");

const asyncPrompt = schema =>
  new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

module.exports = asyncPrompt;
