const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true   // 🔥 prevents duplicate users
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true
  }
})

module.exports = mongoose.model("User", UserSchema)