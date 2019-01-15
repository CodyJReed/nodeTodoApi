const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

// Create new collection document model
const Todo = mongoose.model("Todos", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: "Make dinner"
});

newTodo.save().then(
  doc => {
    console.log("Save todo", doc);
  },
  err => {
    console.log("Unable to save todo", err);
  }
);
