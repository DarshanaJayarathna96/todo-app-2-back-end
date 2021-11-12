const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/todo", todoRoutes);

mongoose
  .connect(
    "mongodb+srv://darshanajayarathna:todo11@@cluster0.vkkpm.mongodb.net/todo?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then((result) => {
    app.listen(8282);
  })
  .catch((err) => console.log(err));
