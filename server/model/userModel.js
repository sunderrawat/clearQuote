const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "user must have an email address"],
    validate: [validator.isEmail, "Email address is not valid"],
  },
  phone: {
    type: Number,
    unique: true,
    required: [true, "user must have an phone number"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "user must have an password"],
    minlength: [6, "minimum 6 chars"],
    maxlength: [20, "maximum 20 chars"],
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "user must have an confirm password"],
    validate: {
      //only works on .create() and .save()
      validator: function (val) {
        return val === this.password;
      },
      message: "password not matched",
    },
  },
  //admin role only create in database
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//mongoose middelware for password encryption
userSchema.pre("save", async function (next) {
  // make password encrypted before save and user creation
  this.password = await bcrypt.hash(this.password, 12);

  //delete confirm password field
  this.passwordConfirm = undefined;
  next();
});

//genrating web tokens
userSchema.methods.genrateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "my-secret");
  this.token = token;
  await this.save({ validateBeforeSave: false });
  return token;
};

//login user function
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//create model
const User = mongoose.model("User", userSchema);

module.exports = User;
