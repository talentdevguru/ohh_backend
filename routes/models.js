const Model = require("../models/model");
var multer = require("multer");
var bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("../config/config");

require("dotenv").config();

const { validateSignupData, validateLoginData } = require("../util/validators");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

var cpUpload = upload.fields([
  { name: "full_length", maxCount: 1 },
  { name: "full_length_profile", maxCount: 1 },
  { name: "portrait_length", maxCount: 1 },
  { name: "close_up", maxCount: 1 },
  { name: "close_up_profile", maxCount: 1 },
  { name: "personality_pic", maxCount: 1 }
]);

var BCRYPT_SALT_ROUNDS = 12;

// Sign up new model
exports.signupModel = (req, res) => {
  cpUpload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(404).send(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(404).send(err);
    }
    console.log("request data: ", req);
    var photos = [];
    // console.log("full_length: ", req.files["full_length"]);
    if (typeof req.files["full_length"] !== "undefined") {
      let full_length = {
        title: req.files["full_length"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["full_length"][0]["filename"]}`
      };
      photos.push(full_length);
    }

    if (typeof req.files["full_length_profile"] !== "undefined") {
      let full_length_profile = {
        title: req.files["full_length_profile"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["full_length_profile"][0]["filename"]}`
      };
      photos.push(full_length_profile);
    }

    if (typeof req.files["portrait_length"] !== "undefined") {
      let portrait_length = {
        title: req.files["portrait_length"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["portrait_length"][0]["filename"]}`
      };
      photos.push(portrait_length);
    }

    if (typeof req.files["close_up"] !== "undefined") {
      let close_up = {
        title: req.files["close_up"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["close_up"][0]["filename"]}`
      };
      photos.push(close_up);
    }

    if (typeof req.files["close_up_profile"] !== "undefined") {
      let close_up_profile = {
        title: req.files["close_up_profile"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["close_up_profile"][0]["filename"]}`
      };
      photos.push(close_up_profile);
    }

    if (typeof req.files["personality_pic"] !== "undefined") {
      let personality_pic = {
        title: req.files["personality_pic"][0]["fieldname"],
        fileurl: `${process.env.Site_URL}/images/${req.files["personality_pic"][0]["filename"]}`
      };
      photos.push(personality_pic);
    }

    let newModel = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      instagram_url: req.body.instagram_url,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      postal_code: req.body.postal_code,
      state: req.body.state,
      birthday: req.body.birthday,
      model: req.body.model,
      story1: req.body.story1,
      story2: req.body.story2,
      story3: req.body.story3,
      representation: req.body.representation,
      metric: req.body.metric,
      bust: req.body.bust,
      height: req.body.height,
      eye: req.body.eye,
      waist: req.body.waist,
      shoe: req.body.shoe,
      cup: req.body.cup,
      hip: req.body.hip,
      hair: req.body.hair,
      photos: photos
    };
    console.log("newModel Data: ", newModel);
    // const { valid, errors } = validateSignupData(newModel);

    // if (!valid) return res.status(400).json(errors);

    bcrypt
      .hash(newModel.password, BCRYPT_SALT_ROUNDS)
      .then(function(hashedPassword) {
        newModel.password = hashedPassword;
        Model.create(newModel)
          .then(model => {
            let token = jwt.sign({ email: model.email }, config.secret, {
              expiresIn: "24h" // expires in 24 hours
            });
            // return the JWT token for the future API calls
            res.header("Authorization", `Bearer ${token}`).json({
              success: true,
              message: "Signup successful!",
              token: `Bearer ${token}`
            });
          })
          .catch(err => res.status(200).send(err));
      })
      .catch(function(error) {
        res.send(200).json({
          success: false,
          message: "Signup failed! Please check the request"
        });
      });
  });
};

// Login Model
exports.loginModel = (req, res) => {
  console.log("email data: ", req.body.email);
  console.log("password data: ", req.body.password);
  const loginData = {
    email: req.body.email,
    password: req.body.password
  };
  const { valid, errors } = validateLoginData(loginData);

  if (!valid) return res.status(400).json(errors);

  Model.findOneByModelEmail(loginData.email)
    .then(model => {
      if (!model)
        return res.status(403).json({
          success: false,
          message: "Incorrect email or password"
        });
      return bcrypt
        .compare(loginData.password, model.password)
        .then(function(samePassword) {
          if (!samePassword) {
            res.status(403).json({
              success: false,
              message: "Incorrect email or password"
            });
          }

          let token = jwt.sign({ email: model.email }, config.secret, {
            expiresIn: "24h" // expires in 24 hours
          });
          // return the JWT token for the future API calls

          res.header("Authorization", `Bearer ${token}`).json({
            success: true,
            message: "Authentication successful!",
            token: `Bearer ${token}`
          });
        })
        .catch(function(error) {
          res.send(400).json({
            success: false,
            message: "Authentication failed! Please check the request"
          });
        });
    })
    .catch(err => res.status(500).send(err));
};

// Find All Models
exports.findModels = (req, res) => {
  Model.findModels()
    .then(models => {
      if (!models.length)
        return res.status(404).send({ err: "Model not found" });
      res.json({
        success: true,
        models: models
      });
    })
    .catch(err => res.status(500).send(err));
};

// Find All Models
exports.findInfluencers = (req, res) => {
  Model.findInfluencers()
    .then(influencers => {
      if (!influencers.length)
        return res.status(404).send({ err: "Influencer not found" });
      res.json({
        success: true,
        influencers: influencers
      });
    })
    .catch(err => res.status(500).send(err));
};
