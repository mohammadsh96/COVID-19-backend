require("dotenv").config();
let PORT = process.env.PORT || 8080;
const server = require("./src/server");
const { db } = require("./src/models/index");
db.sync()
    .then(() => {
        server.start(PORT);
    })
    .catch(console.error);
