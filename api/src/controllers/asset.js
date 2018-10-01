import response from "./responses";
import assetService from "../services/asset";
import { extractFiles, save, validateFiles } from "../services/file";
import axios from "axios";

const { THUMB_URL } = process.env;
const thmb = axios.create({ baseURL: THUMB_URL });

const create = (req, res) => {
  extractFiles(req, res, async err => {
    if (err) return response.failureResponse(res, err);

    const { files } = req;
    const { username } = req.body;

    try {
      await validateFiles(files);
      const filepaths = await save(files);

      const {
        data: { data }
      } = await thmb.post("/create", { filepaths });

      const payload = await assetService.storeDB({ data, username });

      response.successResponse(res, payload);
    } catch (e) {
      response.failureResponse(res, e);
    }
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
    throw new Error('Invalid request')
  } catch (e) {
    response.failureResponse(res, e);
  }
};

const update = async (req, res) => {};

export default { create, read, update };
