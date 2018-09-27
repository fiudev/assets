import mongoose from 'mongoose';

const { MONGO_USER_DB, MONGO_PASSWORD_DB, MONGO_URL } = process.env;

const options = { user: MONGO_USER_DB, pass: MONGO_PASSWORD_DB, useNewUrlParser: true };

const db = async () => {
  try {
    await mongoose.connect( MONGO_URL, options );
  } catch (e) {
    console.log(`DB ERROR: \n${e.message}`);
  }
};

export default db ;
