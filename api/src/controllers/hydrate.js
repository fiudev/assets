import httpResponse from "../responses/httpResponses";
import assetService from "../services/asset";

import logger from "../utils/logger";

const create = async (req, res) => {
  const { user } = req;
  const { assetPaths, tags } = req.body;

  try {
    const cleanTags = await assetService.validateTags(tags);
    const payload = await assetService.storeDB({
      assetPaths,
      user,
      cleanTags
    });

    logger.info(`${user.email} uploaded ${assetPaths.length}`);

    httpResponse.successResponse(res, payload);
  } catch (e) {
    httpResponse.failureResponse(res, e);
  }
};

export default { create };
