import response from "./responses";
import { genThumbnail } from "./thumbnail";

/**
 * Receives array of filepath
 * @param {Array<string>} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { filepaths } = req.body;

  try {
    if (!filepaths) throw new Error("Invalid request");
    if (filepaths.length <= 0) throw new Error("Invalid request");
    if (!Array.isArray(filepaths)) throw new Error("Invalid request");

    let dest = new Array();

    for (let original of filepaths) {
      const { dest: thumbnail } = await genThumbnail(original);
      dest.push({ thumbnail, original });
    }

    response.successResponse(res, dest);
  } catch (e) {
    response.failureResponse(res, e.message);
  }
};

export default create;
