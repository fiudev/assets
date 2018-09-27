import response from "./responses";
import assetService from "../services/asset";

const create = async (req, res) => {};

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
