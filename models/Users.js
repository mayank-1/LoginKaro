const UserModel = {};

const bcrypt = require("bcryptjs");

const db = require("./db");

UserModel.register = (user, callback) => {
  var dbObject = db.getDBInstance();
  const collection = dbObject.collection("users");

  collection.find({ email: user.email }).toArray(function(err, docs) {
    // First check for user exist with same email ID or not
    if (docs.length > 0) {
      //User already exist with the same email ID
      return callback("User with this email ID Already Exists!");
    } else {
      // Insert The data
      collection.insertOne(user, (err, resp) => {
        if (!err) {
          return callback(null, resp);
        } else {
          return callback("Database Error!");
        }
      });
    }
  });
};

UserModel.login = (user, callback) => {
  var dbObject = db.getDBInstance();
  const collection = dbObject.collection("users");

  collection.find({ email: user.email }).toArray(function(err, docs) {
    if (!err) {
      // First check for user exist
      if (docs.length > 0) {
        //User Found
        //Check if password is correct or not
        bcrypt.compare(user.password, docs[0].password, (err, resp) => {
          if (resp) {
            //PASSWORD CORRECT
            return callback(null, docs[0]);
          } else {
            //INCORRECT PASSWORD
            return callback("INVALID PASSWORD");
          }
        });
      } else {
        //No Account Associated with this Email ID
        return callback("INVALID EMAIL");
      }
    } else {
      return callback("SERVER ERROR");
    }
  });
};

module.exports = UserModel;
