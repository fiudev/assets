import Router from "express";

import asset from "../controllers/asset";
import user from "../controllers/user";
import hydrate from "../controllers/hydrate";

import authTokens from "../controllers/authTokens";

import authUser from "../middleware/authUser";
import authCreator from "../middleware/authCreator";

const apiRouter = Router();
const authRouter = Router();

apiRouter.post("/assets", authUser, asset.create);
apiRouter.get("/assets", asset.read);

apiRouter.get("/download", asset.download);

apiRouter.post("/hydrate", authUser, hydrate.create);

// apiRouter.put("/asset", asset.update);

apiRouter.get("/user/:id", authCreator, user.read);
apiRouter.post("/user", authCreator, user.create);

authRouter.post("/tokens", authTokens.create);

export { apiRouter, authRouter };
