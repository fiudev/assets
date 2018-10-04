import httpResponse from "../responses/httpResponses";
import errorResponse from "../responses/errorResponses";
import assetService from "../services/asset";
import fileService from "../services/file";

const create = (req, res) => {
  fileService.extractFiles(req, res, async err => {
    if (err) return httpResponse.failureResponse(res, err);

    const { files } = req;
    const { username, tags } = req.body;

    try {
      await fileService.validateFiles(files);
      const cleanTags = await assetService.validateTags(tags);
      const filePaths = await fileService.save(files);

      const assetPaths = await assetService.createThumbnails(filePaths);

      const payload = await assetService.storeDB({
        assetPaths,
        username,
        cleanTags
      });

      httpResponse.successResponse(res, payload);
    } catch (e) {
      httpResponse.failureResponse(res, e);
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
      return httpResponse.successResponse(res, query);
    }
    throw new Error(errorResponse.invalidRequest);
  } catch (e) {
    return httpResponse.failureResponse(res, e);
  }
};

const update = async (req, res) => {};

export default { create, read, update };
