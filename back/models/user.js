const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
mongoose.plugin(mongodbErrorHandler);

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true/*,unique: true*/ },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
