const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// Todo.deleteMany({}).then(res => {
//   console.log(res);
// });

Todo.findOneAndDelete({
  _id: "5c40ba62782ca61e35f866f7"
}).then(todo => {
  console.log(todo);
});
