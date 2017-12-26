const express = require("express");

const app = express();

// specify handlers for different routes, and different HTTP calls

// handler for HTTP GET request
// takes 2 arguments => URL, and a function that returns a value
// the function takes 2 arguments => request, and response
// request contains information about the request made => HTTP method used, request headers, body, etc
// response has a bunch methods available to you that you can use to respond to the request in whatever way you want

// root route
app.get("/", (request, response) => {
  // Response headers
  // Content-type tells the client what kind of data came back from the server => text/html for HTML
  // When you pass JSON object to response.send(), it sets Content-type to application/json
  // When you pass a string => Content-type is set to text/html
  const person = {
    name: "Andrew",
    likes: ["Node", "Programming"]
  };

  const template = "<h1> Hello Express </h1>";
  response.send(person);
});

// add a 2nd route => /about
app.get("/about", (request, response) => {
  response.send("This is about page");
});

// add a bad route that results in an error => /bad
app.get("/bad", (request, response) => {
  const error = {
    errorMessage: "This is a glorious error"
  };

  // throws 500 Internal Server Error and displays => ReferenceError: errorMessage is not defined
  //   response.send(errorMessage);
  response.send(error);
});

// Tell the app to listen to a port
app.listen(3000);
