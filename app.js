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

const {
  findModels,
  findInfluencers,
  loginModel,
  signupModel
} = require("./routes/models");

const { findTalent, contactUS } = require("./routes/sendmails");

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
app.get("/models", findModels);
// Get all influencers data
app.get("/influencers", findInfluencers);

// Find talent api
app.post("/find_talent", findTalent);

// Contact us api
app.post("/contact_us", contactUS);

// app.post("/contact_us", jwtAuth.checkToken, contactUS);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
