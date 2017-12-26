const express = require("express");

const app = express();

// Middleware lets you configure how your express app works. Think of it as a kind of 3rd party add-on
// You need to provide the absolute path of static file you want to serve.
// It is difficult to have a single path as you keep moving around your projects.
// To solve this, use `__dirname` variable provided by the ndoe wrapper function
app.use(express.static(__dirname + "/public"));

// app.listen() takes a 2nd argument => a function that will be run after the server is up.
app.listen(3000, () => console.log("Server is up on port 3000"));

// --------------------------------------------------
// IMPORTANT
// --------------------------------------------------

// You can serve a static directory using just 4 lines (written above)
// This makes node and express the goto choice when you want to serve a static website

// Just 2 lines
/* const express = require("express");
express()
  .use(express.static(__dirname + "/public"))
  .listen(3000); */
