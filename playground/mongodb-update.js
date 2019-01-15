const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    db.collection("Todos")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5c3cbcb7782ca61e35f84aab")
        },
        {
          $set: {
            completed: true
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });
    // db.close();
  }
);
