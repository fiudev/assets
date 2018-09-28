import response from "./responses";
import { extractFiles, thumbnail, saveBuffer } from "./upload";

const create = (req, res) => {
  extractFiles(req, res, async err => {
    if (err) return response.failureResponse(res, err);

    const { files } = req;
    const { username } = req.body;

    let destInfo = new Array();

    for (let file of files) {
      const { dest: filepath } = await saveBuffer(file);
      const { dest: thumb } = await thumbnail(filepath);
      destInfo.push({ username, thumb, filepath });
    }

    response.successResponse(res, destInfo);
  });
};

export default create;
