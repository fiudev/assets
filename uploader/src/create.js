import response from "./responses";
import { thumbnail } from "./upload";

/**
 * Receives array of filepath
 * @param {Array<string>} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { filepaths } = req.body;

  if (filepaths.length <= 0)
    return response.failureResponse(res, "Invalid request");
  if (!Array.isArray(filepaths))
    return response.failureResponse(res, "Invalid request");

  let dest = new Array();

  try {
    for (let filepath of filepaths) {
      const { dest: thumb } = await thumbnail(filepath);
      dest.push({ thumb, filepath });
    }

    response.successResponse(res, dest);
  } catch (e) {
    response.failureResponse(res, e);
  }
};

export default create;
