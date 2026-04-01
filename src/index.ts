import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

import { connectDB } from "./config/db";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
