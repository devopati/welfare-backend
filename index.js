import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import errorHandlerMiddleware from "./errors/errro-handler.js";

import appRoute from "./routes/app-routes.js";
import createPdf from "./utils/create-pdf.js";
import createMember from "./controllers/create-member.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to welfare site");
});

// createPdf();

//routes
app.use("/api", appRoute);

app.get("*", (req, res) => {
  res.send("404 page not found");
});

// createMember();

//middlewares
// app.use(errorHandlerMiddleware());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
