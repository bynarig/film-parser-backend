import mongoose from "mongoose";
import dotenv from "dotenv"; // connecting dotenv
dotenv.config();

import models from "../models/index.js";

export async function connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {});
    console.log("DB connected");
    return true;
  } catch (err) {
    console.log(`DB don't connected ${err}`);
    return false;
  }
}
export const DB = {
  models
};