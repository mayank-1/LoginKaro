const express = require("express");
const router = express.Router();

const auth = require("./../auth/auth");

router.get("/home", auth.redirectToLogin, (req, res) => {
  console.log("Authenticated: ", req.session);
  return res.render("users/home", {
    user: req.session.user
  });
});

//Logout Functionality
router.post("/logout", auth.redirectToLogin, (req, res) => {
  if (req.session.user) {
    //Session Present
    req.session.destroy();
    res.redirect("/login");
  }
});

module.exports = router;
