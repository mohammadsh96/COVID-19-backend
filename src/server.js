"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");
const authRouter = require("../src/routes/usersRouter");
const recordsRouter = require("./routes/recordsRouter");
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(recordsRouter);
app.use("*", notFoundHandler);

app.use(errorHandler);

function start(PORT) {
  try {
    app.listen(PORT,'0.0.0.0', () => {
      console.log(`Listen and Running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  app: app,
  start: start,
};
