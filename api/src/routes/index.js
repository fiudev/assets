import Router from "express";

import asset from "../controllers/asset";
import user from "../controllers/user";

const apiRouter = Router();

// apiRouter.post("/asset", asset.create);
// apiRouter.get("/asset", asset.read);
// apiRouter.put("/asset", asset.update);

// apiRouter.get("/user", user.read);
// apiRouter.post("/user", user.create);

export { apiRouter };
