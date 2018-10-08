const axios = require("axios");

const API_URL = "http://localhost:3000";
const USER_TOKEN = "";

const ai = axios.create({
  baseURL: API_URL,
  headers: { Authorization: "Bearer " + USER_TOKEN }
});

const save = assetPaths =>
  new Promise(async (resolve, reject) => {
    try {
      const tags = ["fiu"];
      const { data } = await ai.post("/api/hydrate", { assetPaths, tags });

      resolve(data.data);
    } catch (e) {
      reject(e);
    }
  });

module.exports = save;
