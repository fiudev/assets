require("dotenv").config({ silent: true });
const jwt = require("jsonwebtoken");

const { CREATOR_KEY, SECRET_KEY } = process.env;

const getToken = () => {
  const token = jwt.sign({ creatorKey: CREATOR_KEY }, SECRET_KEY, {
    expiresIn: "1h"
  });

  console.log({ token, expiresIn: 60 * 60 });
};

getToken();
