const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

const _id = "c3e373e2aa445714fe708be";
//
// if (!ObjectID.isValid(_id)) {
//   console.log("ID not valid");
// }
//
// // Todo.find({
// //   _id
// // }).then(todos => {
// //   console.log("Todos", todos);
// // });
// //
// // Todo.findOne({
// //   _id
// // }).then(todo => {
// //   console.log("Todo", todo);
// // });
//
// Todo.findById(_id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("Id not found");
//     }
//     console.log("Todo By Id", todo);
//   })
//   .catch(err => console.log(err));
User.findById(_id)
  .then(user => {
    if (!user) {
      return console.log("User not found");
    }
    console.log("User by ID", user);
  })
  .catch(err => console.log(err));
