import Router from "express";

import asset from "../controllers/asset";
import user from "../controllers/user";

const apiRouter = Router();

apiRouter.post("/assets", asset.create);
apiRouter.get("/assets", asset.read);
// apiRouter.put("/asset", asset.update);

// apiRouter.get("/user", user.read);
// apiRouter.post("/user", user.create);

export { apiRouter };
