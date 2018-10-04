import Router from "express";

import asset from "../controllers/asset";
import user from "../controllers/user";

import authTokens from "../controllers/authTokens";

import authUser from "../middleware/authUser";
import authCreator from "../middleware/authCreator";

const apiRouter = Router();

apiRouter.post("/assets", authUser, asset.create);
apiRouter.get("/assets", asset.read);

// apiRouter.put("/asset", asset.update);

// apiRouter.get("/user", user.read);
// apiRouter.post("/user", authCreator, user.create);

export { apiRouter };
