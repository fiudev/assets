import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import jwt from "jsonwebtoken";

import userService from "../services/user";

const { SECRET_KEY } = process.env;

passport.use(
  new BearerStrategy(async (token, done) => {
    let userId;
    try {
      let decoded = await jwt.verify(token, SECRET_KEY);
      userId = decoded.userId;
    } catch (err) {
      return done(null, false);
    }

    try {
      let user = await userService.findById(userId);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const authMiddleware = passport.authenticate("bearer", { session: false });

export default authMiddleware;
