const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./modules/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("Page not found", 404);
});

//Middleware with 4 parameters will be recognised as error handling middleware functon
//Will be execute on any request that has an error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong" });
});

mongoose
  .connect('mongodb+srv://marko:HEZt5RDGMXjVfZYS@cluster0.v14g4.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
