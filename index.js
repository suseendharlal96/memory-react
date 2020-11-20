import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRouter from "./routes/posts.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);

const mongo =
  "mongodb+srv://suseendhar:susee123@cluster0.iwva7.mongodb.net/memories?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`server running at  http://localhost:${port}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);
