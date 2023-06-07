"use strict";

const express = require("express");
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");
const badGateWay = require("./error-handlers/404");
const serverSideError = require("./error-handlers/500");

const app = express();

app.use(logger);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(express.json());
app.get("/person", validator, (req, res) => {
  const personName = req.query.name;
  res.send({
    name: personName,
  });
});

app.use("*", badGateWay);
app.use(serverSideError);

function start(port) {
  app.listen(port, () => {
    console.log(`server is up and listen on ${port}`);
  });
}
module.exports = {
  start: start,
  app: app,
};
