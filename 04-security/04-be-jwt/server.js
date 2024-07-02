import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//http://localhost:4000/user/
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected and server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });