const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;
// This file empties the Books collection and inserts the books below
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/moment", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UsersSeed = [
  {
    realName: "Giancarlo",
    nicknames: [{
      'name':'ginny'
    }],
    email: "456@456.com",
    password: "123456",
    socialNetworks : [{
      networkName: "Snapchat",
      userName: "Pilzy",
      url: "",
      privacy: "secret"
    }, {
      networkName: "Facebook",
      userName: "Giancarlo Correa",
      url: "facebook.comg/giancarlo",
      privacy: "public"
    }],
    friends: ["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    following: ["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    lastSettingsUpdate: "2018-04-07T16:07:53.410Z",
    dateJoined: "2018-04-06T01:59:03.966Z"

  },

  {
    realName: "Marcello",
    nicknames: [{
      'name':'marvello'
    }],
    email: "123@123.com",
    password: "123456",
    socialNetworks : [{
      networkName: "Snapchat",
      userName: "Marce10",
      url: "",
      privacy: "secret"
    }, {
      networkName: "Facebook",
      userName: "Marcello Galvan",
      url: "facebook.com/marcello",
      privacy: "public"
    }],
    friends:["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    following: ["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    lastSettingsUpdate: "2018-04-07T16:07:53.410Z",
    dateJoined: "2018-04-06T02:45:03.966Z",
  },

  {
    realName: "Yesenia",
    nicknames: [{
      'name':'yessy'
    }],
    email: "345@345.com",
    password: "123456",
    socialNetworks : [{
      networkName: "Snapchat",
      userName: "Yeseni@",
      url: "",
      privacy: "secret"
    }, {
      networkName: "Facebook",
      userName: "Yesenia Coughlin",
      url: "facebook.com/yesenia",
      privacy: "public"
    }],
    friends:["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    following: ["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    lastSettingsUpdate: "2018-04-07T16:07:53.410Z",
    dateJoined: "2018-04-06T03:45:03.966Z"

  },

  {
    realName: "Keissy",
    nicknames: [{}],
    email: "567@567.com",
    password: "123456",
    socialNetworks : [{
      networkName: "Snapchat",
      userName: "KC3PO",
      url: "",
      privacy: "secret",
    }, {
      networkName: "Facebook",
      userName: "Keissy Leonardo",
      url: "facebook.com/keissy",
      privacy: "public",
    }],
    friends:["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    following: ["5ac6d4672227f635ccf1bc76", "5ac8ecd90530457a5a986dd5"],
    lastSettingsUpdate: "2018-04-07T16:07:53.410Z",
    dateJoined: "2018-04-06T04:45:03.966Z"

  },
  
];

db.User
  .deleteMany({})
  .then(() => db.User.insertMany(UsersSeed))
  .then(data => {
    console.log(data.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
