import userService from "../services/user";
import httpResponse from "../responses/httpResponses";

const create = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userService.create({ email });

    httpResponse.successResponse(res, user);
  } catch (e) {
    httpResponse.failureResponse(res, e);
  }
};

const read = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.findById(id);

    httpResponse.successResponse(res, user);
  } catch (e) {
    httpResponse.failureResponse(res, e);
  }
};

export default { create, read };
