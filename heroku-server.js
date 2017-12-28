// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const hbs = require("hbs");

// -----------------------------------------------------
// CONSTANTS
// -----------------------------------------------------
const PORT = process.env.port || 3000;

// -----------------------------------------------------
// Configuration
// -----------------------------------------------------
const app = express();
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/partials");
hbs.registerHelper("screamIt", message => message.toUpperCase());

// Route handlers
app.get("/", (request, response) => {
  response.render("home", {
    pageTitle: "Welcome"
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    pageTitle: "About"
  });
});

app.listen(PORT, () => console.log("Server running on", PORT));
