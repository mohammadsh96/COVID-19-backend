"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var http = require('http');
var server = http.createServer(app);
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
    server.listen(PORT, '0.0.0.0')
     } catch (err) {
    console.log(err);
  }
}
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
})
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(PORT, HOST);
      }, 1000);
    }
  });
module.exports = {
  app: app,
  start: start,
};
