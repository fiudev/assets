import axios from "axios";
import config from "./config.js";

const { API_URL } = config;

const assetInstance = axios.create({ baseURL: API_URL });

const read = tag =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await assetInstance.get("/api/assets?" + "tag=" + tag);
      console.log(data.data);
    } catch (e) {
      console.log(e.message);
    }
  });

export default { read };
