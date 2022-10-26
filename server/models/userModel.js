const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);


module.exports = mongoose.model("User", userSchema);