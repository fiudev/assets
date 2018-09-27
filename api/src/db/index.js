import mongoose from "mongoose";

const { DB_USER, DB_PASS, DB_URL } = process.env;

const options = {
  user: DB_USER,
  pass: DB_PASS,
  useNewUrlParser: true,
  useCreateIndex: true
};

const db = () => Promise.resolve(mongoose.connect(DB_URL, options));

export default db;
