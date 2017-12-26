// Ways of rendering HTML using node
// 1. Send HTML markup through response.send()
// 2. Using middleware => public directory
// 3. Using a templating engine => renders HTML dynamically. You can create reusable markup (header, and footer, for example),
//      insert dynamic data, etc

// We'll be using Handlebarsjs view engine for express. => http://handlebarsjs.com/
// Other view engines for express => EJS, Pug => http://ejs.co/,
// Handlebars syntax is easier
// npm package name => hbs

const express = require("express");
const hbs = require("hbs");

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

app.use(express.static(__dirname + "/public"));

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
