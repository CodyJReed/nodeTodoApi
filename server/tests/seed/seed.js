const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { Todo } = require("../../models/todo");
const { User } = require("../../models/user");

// Test user(s) collection array
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: "test1@example.com",
    password: "user1pass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "test2@example.com",
    password: "user2pass"
  }
];
const todos = [
  { text: "firts todos", _id: new ObjectID() },
  {
    text: "second todos",
    _id: new ObjectID(),
    completed: true,
    completedAt: 1234
  }
];

// Before each test wipe Todo(s)
// then populate mongodb collection
const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

// Before each test wipe User(s)
// then populate mongodb collection
const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
