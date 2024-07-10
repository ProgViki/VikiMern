import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";
 
 export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)
      console.log("Succeeded connected to DB");
    
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1)
  }
}