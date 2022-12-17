"use strict";
const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index");
const basicAuth = require("../middleware/basic.js");


authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log(userRecord.token);
    const output = {
      user: userRecord,
         };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
  };
  res.status(200).json(user);
});
module.exports = authRouter ;