// It allows you to add on to the existing functionalities of express. It lets you teach things to express.

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

// A partial is a partial piece of a website that can be reused
// Tell handlebarjs that we are gonna use partials
// takes one argument, the absolute path of the directory containing partials
hbs.registerPartials(__dirname + "/partials");

// Handlebars helpers => a way to register functions to run that generate data dynamically
// takes 2 arguments => name of the helper, and the function that generates dynamic data
// help you run some JS code inside your handlebars templates
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

// a helper function that takes arguments
hbs.registerHelper("screemIt", message => {
  message = message || "";
  return message.toUpperCase();
});

// Expressjs configuration => takes key value pairs, key: configuration, value: what express should use
app.set("view engine", "hbs");

// 'views' is the default directory that Express uses for templates
// create a directory called 'views'

// IMPORTANT: middleware are called in the order they are registered

// register express middleware, takes a function
app.use(express.static(__dirname + "/public"));

// create a logger that logs every request made to the server along with a timestamp
app.use((req, res, next) => {
  // the parameter `next` lets you tell express when the middleware function done, something like next();
  // You log something, do something asynchronous, make db queries
  const now = new Date().toString();
  const log = ` Time: ${now} \n METHOD: ${req.method}\n URL: ${req.url}\n`;

  console.log(log);

  // The 3rd argument, callback function is now required.
  // If you don't provide a callback, it'll throw deprecation warning in node v7 or greater
  fs.appendFile("server.log", log + "\n", error => {
    if (error) {
      console.log("Unable to write to file");
    }
  });

  // Let express know that you're done with the processing of middleware.
  // This is important. If you don't run this, the app will be struck.
  // The app won't proceed to the 'next middleware' (IMPORTANT) until you call this function
  next();
});

// To show a message to user that we are in maintenance mode
app.use((req, res, next) => {
  // DO NOT CALL next() => to prevent user from traversing the site in maintenance mode
  // Just render the maintenance view
  res.render("maintenance");
});

app.get("/", (request, response) => {
  response.render("home.hbs", {
    pageTitle: "Home Page"
  });
});

// add a 2nd route => /about
app.get("/about", (request, response) => {
  // response.send("This is about page");
  // render handlbars template
  //   response.render("about.hbs"); // Express will look for this file in the default directory for templates, which is 'views'

  //   You can inject dynamic data to the template through the 2nd argument to render() function.
  //   Wrap the dynamic data in mustaches ({{}}) in the template to resolve it.
  response.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.listen(3000, () => console.log("Server is up on port 3000"));
