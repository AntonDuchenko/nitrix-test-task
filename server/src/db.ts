import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(error => {
      console.error("Error connecting to MongoDB:", error);
    });
}

export default connectDB;
