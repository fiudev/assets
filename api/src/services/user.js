import User from "../models/user";
import bcrypt from "bcryptjs";

const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const create = data =>
  new Promise(async (resolve, reject) => {
    try {
      const { email } = data;
      const isValidEmail = validateEmail(email);

      if (isValidEmail) {
        const user = await User.create({ email });
        resolve({ user });
      }
      reject("Invalid Email.");
    } catch (e) {
      reject(e);
    }
  });

const findById = id =>
  new Promise((resolve, reject) => {
    const user = User.findById(id);

    if (user) resolve(user);

    reject(user);
  });

const verifyUser = async email =>
  new Promise(async (resolve, reject) => {
    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      const user = await User.findOne({ email });

      if (user) {
        const verified = email == user.email;
        const isVerified = verified ? user : false;
        resolve(isVerified);
      }
      reject("User not found.");
    }

    reject("Could not verify email.");
  });

export default { create, findById, verifyUser };
