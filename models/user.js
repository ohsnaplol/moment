const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  realName: { type: String },
  nicknames: [{ type: String }],
  email: { type: String, required: true },
  password: { type: String, required: true},
  socialNetworks: [{
    networkName: { type: String },
    userName: { type: String },
    url: { type: String },
    privacy: { type: String }
  }],
  friends: [{ type: Schema.Types.ObjectId }],
  following: [{ type: Schema.Types.ObjectId }],
  lastSettingsUpdate: { type: Date },
  dateJoined: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)

module.exports = User
