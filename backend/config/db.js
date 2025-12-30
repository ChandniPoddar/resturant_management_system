import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://greatstack:33858627@cluster0.ksegljf.mongodb.net/food-del"
    ).then (()=>console.log("✅ MongoDB connected successfully")) 
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
