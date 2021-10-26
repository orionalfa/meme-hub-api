const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    firebase_id: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please, give us your user name"],
    },
    email: {
      type: String,
      required: [true, "Please, give us your email"],
    },
    firstname: {
      type: String,
      default: "",
      required: [true, "Please, give us your first name"],
    },
    lastname: {
      type: String,
      default: "",
      required: [true, "Please, give us your last name"],
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
