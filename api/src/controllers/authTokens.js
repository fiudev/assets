import httpResponse from "../responses/httpResponses";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const create = async (req, res) => {
  try {
    const { userId, secret } = req.body;

    let verifiedUser = await assetService.verifySecret(userId, secret);
    if (!verifiedUser) {
      throw new Error(`Couldn't verify user`);
    }

    const token = jwt.sign({ eventId: verifiedUser.id }, SECRET_KEY);
    return httpResponse.successResponse(res, token);
  } catch (e) {
    return httpResponse.failureResponse(res, e.message);
  }
};

export default { create };
