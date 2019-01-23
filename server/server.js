// Local Imports
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

// Library Imports
// Config env.MONGODB_URI
require("./config/config");

// Mongoose
const { mongoose } = require("./db/mongoose");

// Collection Model(s)/Schema(s)
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Post/Create a todo(s)
app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// Get all todos
app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// Get todo by ID
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// Delete Todo(s)
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => {
      return res.status(400).send();
    });
});

// Update Todo(s)
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // Set completedAt
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// User Sign Up
app.post("/users", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  const user = new User(body);

  user
    .save()
    .then(() => {
      // Return token to chain callback
      return user.generateAuthToken();
    })
    .then(token => {
      // Create custom http header with token and send user
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

// User Sign-in
app.post("/users/login", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        // Create custom http header with token and send user
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// User logout
app.delete("/users/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
