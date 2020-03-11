const mongoose = require("mongoose");

// Define Schemas
const modelSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    instagram_url: { type: String, required: false },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },
    state: { type: String, required: true },
    birthday: { type: String, required: true },
    model: { type: String, required: true },
    story1: { type: String, required: true },
    story2: { type: String, required: true },
    story3: { type: String, required: true },
    representation: { type: String, required: true },
    metric: { type: String, required: true },
    bust: { type: String, required: true },
    height: { type: String, required: true },
    eye: { type: String, required: true },
    waist: { type: String, required: true },
    shoe: { type: String, required: true },
    cup: { type: String, required: true },
    hip: { type: String, required: true },
    hair: { type: String, default: false },
    photos: { type: Array, required: true }
  },
  { timestamps: true }
);

// Create new model document;
modelSchema.statics.create = function(payload) {
  // this === Model
  const model = new this(payload);
  // return Promise
  return model.save();
};

// Find All
modelSchema.statics.findModels = function() {
  // return promise
  return this.find().sort({ updatedAt: -1 });
};

modelSchema.statics.findInfluencers = function() {
  // return promise
  return this.find({ model: "true" }).sort({ updatedAt: -1 });
};

// Find one with email
modelSchema.statics.findOneByModelEmail = function(email, password) {
  // return promise
  return this.findOne({ email });
};

// Create Model & Export
module.exports = mongoose.model("Model", modelSchema);
