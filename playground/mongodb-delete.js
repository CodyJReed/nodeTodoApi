const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");

    // deleteMany
    // db.collection("Users")
    //   .deleteMany({ name: "Cody" })
    //   .then(result => {
    //     console.log(result);
    //   });
    // deleteOne
    // db.collection("Todos")
    //   .deleteOne({ text: "Walk the dog" })
    //   .then(result => {
    //     console.log(result);
    //   });
    // findOneAndDelete
    db.collection("Users")
      .findOneAndDelete({ _id: new ObjectID("5c3b3260a2a781553b31c6da") })
      .then(doc => {
        console.log(doc);
      });
    // db.close();
  }
);
