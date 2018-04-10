const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  realName: { type: String },
  nicknames: [{ 
    _id: false,
    name: { type: String } 
  }],
  email: { type: String, required: true },
  password: { type: String, required: true},
  socialNetworks: [{
    _id: false,
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

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
},
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User
