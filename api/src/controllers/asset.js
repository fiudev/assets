import response from "./responses";
import assetService from "../services/asset";

import { extractFiles, saveBuffer } from "../services/file";

import axios from "axios";

const { THUMB_URL } = process.env;
const thumbnail = axios.create({ baseURL: THUMB_URL });

const create = (req, res) => {
  extractFiles(req, res, async err => {
    if (err) return failureResponse(res, err);

    const { files } = req;

    let filepaths = new Array();

    for (let file of files) {
      const { filepath } = await saveBuffer(file);
      filepaths.push({ filepath });
    }

    const { data } = await thumbnail.post("/create", { filepaths });

    response.successResponse(res, data.data);
  });
};

const read = async (req, res) => {
  const { page = 0, limit = 10, tag = null } = req.query;

  const queryLimit = parseInt(Math.abs(limit));
  const pageQuery = parseInt(Math.abs(page)) * queryLimit;

  const currentPage = pageQuery / queryLimit;

  try {
    const isValidTag = await assetService.validateTag(tag);
    if (isValidTag) {
      const payload = { currentPage, pageQuery, queryLimit };

      const query = await assetService.searchByTag(payload, tag);
      response.successResponse(res, query);
    }
  } catch (e) {
    response.failureResponse(res, e);
  }
};

const update = async (req, res) => {};

export default { create, read, update };
