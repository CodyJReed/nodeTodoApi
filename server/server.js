// Local Imports
const express = require("express");
const bodyParser = require("body-parser");

// Library Imports

// Mongoose
const { mongoose } = require("./db/mongoose");

// Collection Model(s)/Schema(s)
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  console.log(req.body);
});

app.listen("3000", () => {
  console.log("Started on port 3000");
});
