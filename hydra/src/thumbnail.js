const axios = require("axios");

const THUMBNAIL_URL = "http://localhost:3001";
const ui = axios.create({ baseURL: THUMBNAIL_URL });

const thumbnail = filepaths =>
  new Promise(async (resolve, reject) => {
    const { data } = await ui.post("/create", { filepaths });
    resolve(data.data);
  });

module.exports = thumbnail;
