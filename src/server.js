"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");
const authRouter = require("../src/routes/usersRouter");
const recordsRouter = require("./routes/recordsRouter");
var http = require('http');

var server = http.createServer(app);

app.get('/', function(req, res) {
    res.send("Hello World!");
});

// server.listen(3000, 'localhost');
// server.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// })
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(recordsRouter);
app.use("*", notFoundHandler);

app.use(errorHandler);

function start(PORT) {
  try {
    server.listen(PORT, '0.0.0.0')
    // app.listen(PORT, () => {
    //   console.log(`Listen and Running on port ${PORT}`);
    // });
  } catch (err) {
    console.log(err);
  }
}
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
})
module.exports = {
  app: app,
  start: start,
};
