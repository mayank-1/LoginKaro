const express = require("express");
const router = express.Router();

const auth = require("./../auth/auth");

const bcrypt = require("bcryptjs");

// Import UserModel
const UserModel = require("../../models/Users");

router.get("/", auth.redirectToHome, (req, res) => {
  return res.render("index", {
    title: "Welcome To LoginKaro"
  });
});

// Route for /login GET method
router.get("/login", auth.redirectToHome, (req, res) => {
  return res.render("login", {
    title: "LOGIN"
  });
});

// Route for  /login POST method
router.post("/login", auth.redirectToHome, (req, res) => {
  var userLogin = req.body;
  UserModel.login(userLogin, (err, resp) => {
    if (!err) {
      //LOGIN SUCCESS
      req.session.user = resp;
      return res.redirect("/user/home");
    } else {
      if (err === "INVALID PASSWORD") {
        return res.render("login", {
          title: "LOGIN",
          error: {
            alertType: "danger",
            alertMessage: "Oops! Invalid Email or Password"
          }
        });
      } else if (err === "INVALID EMAIL") {
        return res.render("login", {
          title: "LOGIN",
          error: {
            alertType: "warning",
            alertMessage:
              "Oops! No Account Associated with this Email ID. Please Register!"
          }
        });
      } else {
        //SERVER ERROR
        return res.render("login", {
          title: "LOGIN",
          error: {
            alertType: "danger",
            alertMessage: "Server Error, Please Try Again After Sometime!"
          }
        });
      }
    }
  });
});

// Route for /register GET method
router.get("/register", auth.redirectToHome, (req, res) => {
  return res.render("register", {
    title: "REGISTER"
  });
});

// Route for /register POST method
router.post("/register", auth.redirectToHome, (req, res) => {
  var user = req.body;
  console.log("User Data: ", user);
  if (user.password === user.cpassword) {
    // Encrypt the password

    bcrypt.hash(user.password, 10, (err, hash) => {
      console.log("Hash Password for " + user.password + " is: " + hash);
      var newUser = {
        name: user.name,
        email: user.email,
        password: hash
      };

      console.log("User: ", newUser);

      //Call the register method in UserModel to add the user to database
      UserModel.register(newUser, (err, resp) => {
        if (!err) {
          //Set Session
          req.session.user = resp.ops[0];
          console.log("Session: ", req.session.user);
          return res.redirect("/user/home");
        } else {
          console.log(err);
          return res.render("register", {
            data: {
              alertType: "warning",
              alertMessage: err
            }
          });
        }
      });
    });
  } else {
    // Validation Error
    return res.render("register", {
      data: {
        alertType: "danger",
        alertMessage: "Passowrd and Confirm Password must be same!"
      }
    });
  }
});

module.exports = router;
