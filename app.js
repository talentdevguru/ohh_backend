// ENV;
require("dotenv").config();
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

let jwtAuth = require("./util/jwtAuth");

const app = express();
app.use(cors());

const port = process.env.PORT || 4500;

const { getModels, loginModel, signupModel } = require("./routes/models");

// Static File Service
app.use(express.static("public"));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the native promise of Node.js
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch(e => console.error(e));

// Signup Model
app.post("/signup", signupModel);
// Login Model
app.post("/login", loginModel);

// Get all models data
app.get("/models", jwtAuth.checkToken, getModels);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
