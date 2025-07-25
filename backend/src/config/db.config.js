import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
    console.log("DB :: Connected :: DB Host ->", res.connection.host);
  } catch (error) {
    console.log("DB :: Error :: ", error.message);
    process.exit(1);
  }
};

export default dbConnection;
