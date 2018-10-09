import axios from "axios";
import config from "./config.js";

const { API_URL } = config;

const assetInstance = axios.create({ baseURL: API_URL });

const read = (tag, page = 0) =>
  new Promise(async (resolve, reject) => {
    try {
      const query = `tag=${tag}` + `&page=${page}`;
      const { data } = await assetInstance.get("/api/assets?" + query);
      resolve(data.data);
    } catch (e) {
      reject(e);
    }
  });

export default { read };
