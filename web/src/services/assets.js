import axios from "axios";
import config from "./config.js";

import JSZip from "jszip";
import dwn from "downloadjs";

const { API_URL } = config;

const assetInstance = axios.create({ baseURL: API_URL });
const downloadInstance = axios.create({
  baseURL: API_URL,
  responseType: "blob"
});

const read = (tag, page = 0) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `tag=${tag}` + `&page=${page}` + `&limit=30`;
      const { data } = await assetInstance.get("/assets?" + query);
      resolve(data.data);
    } catch (e) {
      reject(e);
    }
  });

const download = (assets, tag) =>
  new Promise(async (resolve, reject) => {
    const zip = new JSZip();
    const folder = zip.folder(tag);
    let arraySize = assets.length;

    try {
      assets.forEach(async ({ id, originalname }) => {
        const params = { params: { id } };
        const { data } = await downloadInstance.get("/download", params);
        const blob = await new Blob([data], { type: data.type });

        if (navigator.userAgent.includes("Chrome")) {
          folder.file(originalname, blob, { binary: true });
          arraySize--;
          if (arraySize == 0) {
            const content = await zip.generateAsync({ type: "blob" });
            await dwn(content, `${tag}.zip`, "application/zip");
            resolve();
          }
        } else {
          dwn(blob, originalname, blob.type);
          resolve();
        }
      });
    } catch (e) {
      reject(e);
    }
  });

export default { read, download };
