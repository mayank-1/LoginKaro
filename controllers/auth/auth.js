var authController = {};

authController.redirectToLogin = (req, res, next) => {
  //CHECK FOR USER_ID in Session
  if (!req.session.user) {
    //NOT FOUND
    return res.redirect("/login");
  } else {
    //FOUND
    return next();
  }
};

authController.redirectToHome = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/user/home");
  } else {
    next();
  }
};

module.exports = authController;
