const db = require('../models')
const passport = require('../passport')

module.exports = {
  // Return information on every user
  findAll: function (req, res) {
    db.User
      .find()
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Return user information with given user id based on logged in user
  findById: function (req, res) {
    db.User.findById(req.params.id, (err, dbModel) => {
      if (err || dbModel == null) {
        res.json(err)
      } else {
        let filteredNetworks
        filteredNetworks = dbModel.socialNetworks.filter(function (i) {
          // Show everything if user viewing themself
          if (req.user && req.params.id == req.user._id) {
            return true
          }
          // Show private profiles if viewer is target's friend
          if (req.user && i.privacy === 'private') {
            return dbModel.friends.includes(req.user._id)
          }
          // Always show public profiles
          return i.privacy === 'public'
        })
        dbModel.socialNetworks = filteredNetworks
        res.json(dbModel)
      }
    })
  },

  findByNames: function (req, res) {
    var query = {}
    if (req.params.query) {
      query = { $or: [{ realName: { $regex: req.params.query, $options: 'i' } }, { nicknames: { $regex: req.params.query, $options: 'i' } }] }
    }
    console.log('SEARCH: ' + req.params.query)
    db.User
      .find({ realName: { '$regex': req.params.query, '$options': 'i' } })
      // un comment this if you want to test searching by realNames and nicknames
      // .find(query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Create a new user
  create: function (req, res) {
    const { email, password } = req.body
    db.User.findOne({ email: email }, (err, user) => {
      console.log('findOne result = ' + JSON.stringify(user))
      if (err) {
        res.json(err) //db error
      } else if (user) {
        res.json({
          'error': `A user with email ${email} already exists`
        })
      } else {
        console.log('saving new user...')
        var user = new db.User({ email: email, password: password })
        user.save(function (err) {
          if (err) {
            res.json(err)
          } else {
            res.json({ 'success': 'weee' })
          }
        })
      }
    })
  },
  // Change user information with given id
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Remove user with id
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Push to user with given id's socialNetworks array
  addNetwork: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $push: { socialNetworks: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Remove network with data of req.body from user with id
  removeNetwork: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $pull: { socialNetworks: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Add friend with id to user with id
  addFriend: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Remove friend with id from user with id
  removeFriend: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}