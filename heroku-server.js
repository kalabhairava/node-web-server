// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const hbs = require("hbs");

// -----------------------------------------------------
// CONSTANTS
// -----------------------------------------------------
const PORT = process.env.port || 3000; // process.env stores all env variables as key-value pairs

// -----------------------------------------------------
// Configuration
// -----------------------------------------------------
const app = express();
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/partials");
hbs.registerHelper("screamIt", message => message.toUpperCase());

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------

// log every request
app.use((request, response, next) => {
  const now = new Date().toString();
  console.log(
    ` Time: ${now}\n Method: ${request.method}\n URL: ${request.url}\n`
  );

  next();
});

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

// -----------------------------------------------------
// Important
// -----------------------------------------------------

// 1. Install heroku CLI
// 2. login to heroku cli by running `heroku login`
// 3. Add your ssh key => `heroku keys:add`. To remove a ssh-key `heroku keys:remove email_id_associated_with_that_ssh_key`. To see all the keys => `heroku keys`
// 4. For heroku to work, the port should be dynamic. Heroku sets the port in envrironment variables.
// 5. Heroku doesn't know which file to run, so it just runs `npm start` command. You have to provide the command to start your app there.
// 6. Run `heroku create` => creates a new heroku web app, and adds a new remote that points to heroku repository. To deploy a heroku app, you just need to push to this remote.
// 7. To deploy a heroku app => run `git push heroku`
// 8. `heroku open` => opens the app in default browser
