import response from "./responses";
import { save, thumbnail } from "./upload";

const create = (req, res) => {
  save(req, res, async err => {
    if (err) return response.failureResponse(res, err);
    const { files } = req;

    for (let file of files) {
      const thumbDest = await thumbnail(file);
    }

    response.successResponse(res, null);
  });
};

export default create;
