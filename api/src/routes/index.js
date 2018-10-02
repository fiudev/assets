import Router from "express";

import asset from "../controllers/asset";
import user from "../controllers/user";

import authTokens from "../controllers/authTokens";

import authMiddleware from "../middleware/auth";
import authCreatorMiddleware from "../middleware/authCreator";

const apiRouter = Router();

apiRouter.post("/assets", authCreatorMiddleware, asset.create);
apiRouter.get("/assets", asset.read);

// apiRouter.put("/asset", asset.update);

// apiRouter.get("/user", user.read);
// apiRouter.post("/user", authMiddleware, user.create);

export { apiRouter };
