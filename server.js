const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT | 9000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuring Database
require("./models/db");

//Configure Express-Session
app.use(
  session({
    name: "episode-2",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: true,
      maxAge: 1000 * 60 * 60
    }
  })
);

// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Index Route - Will handle everyroute without session
app.use("/", require("./controllers/NoSessionRoutes/index"));

// Users Route - Will handle only logged in users route
app.use("/user", require("./controllers/SessionRoutes/users"));

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
