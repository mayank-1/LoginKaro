const mongoModel = {};

const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "loginkaro";

var db = null;
// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  if (!err) {
    console.log("Database Connected Successfully!");

    db = client.db(dbName);
    mongoModel.setDBInstance(db);

    // client.close();
  } else {
    console.log("Database Server Error: ", err);
  }
});

mongoModel.setDBInstance = dbObject => {
  db = dbObject;
};

mongoModel.getDBInstance = () => {
  return db;
};

module.exports = mongoModel;
