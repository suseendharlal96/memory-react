import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);
app.use("/user", userRouter);

const mongooseUrl = process.env.MONGOOSE;

const port = process.env.PORT || 5000;
mongoose
  .connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`server running at  http://localhost:${port}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);
