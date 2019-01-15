const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

// Create new collection document model/schema
const Todo = mongoose.model("Todos", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const User = mongoose.model("Users", {
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1
  }
});

const newUser = new User({
  email: "test@example.com"
});

newUser.save().then(
  doc => {
    console.log(`User saved ${JSON.stringify(doc, undefined, 2)}`);
  },
  err => {
    console.log("Could not save user", err);
  }
);

// const newTodo = new Todo({
//   text: "Make dinner"
// });
//
// newTodo.save().then(
//   doc => {
//     console.log("Save todo", doc);
//   },
//   err => {
//     console.log("Unable to save todo", err);
//   }
// );

// const newChallenge = new Todo({
//   text: "Push changes to GitHub",
//   completed: true,
//   completedAt: 1411
// });
//
// newChallenge.save().then(
//   doc => {
//     console.log("Save todo", doc);
//   },
//   err => {
//     console.log("Unable to save todo", err);
//   }
// );
