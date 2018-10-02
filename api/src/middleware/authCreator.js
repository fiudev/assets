import jwt from "jsonwebtoken";
const { CREATOR_KEY, SECRET_KEY } = process.env;

const authCreator = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send("Unauthorized");

  let token = authorization.split(" ")[1];

  try {
    let decoded = await jwt.verify(token, SECRET_KEY);
    let creatorKey = decoded.creatorKey;
    if (creatorKey !== CREATOR_KEY) return res.status(401).send("Unauthorized");
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
};

export default authCreator;
