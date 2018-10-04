import userService from "../services/user";
import httpResponse from "../responses/httpResponses";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const create = async (req, res) => {
  try {
    const { email } = req.body;

    let verifiedUser = await userService.verifyUser(email);

    if (!verifiedUser) throw new Error(`Couldn't verify user`);

    const token = jwt.sign({ userId: verifiedUser.id }, SECRET_KEY);
    httpResponse.successResponse(res, { token });
  } catch (e) {
    httpResponse.failureResponse(res, e);
  }
};

export default { create };
