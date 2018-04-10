const db = require('../models')
const passport = require('../passport')

module.exports = {
  // Return information on every user
  findAll: function(req, res) {
    console.log('findAll req : ' + req)
    console.log('findAll req.query : ' + req.query)
    db.User
      .find()
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Return user information with given user id
  findById: function(req, res) {
    console.log(req.params)
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Create a new user
  create: function(req, res) {
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
        var user = new db.User({email: email, password: password})
        user.save(function(err) {
          if (err) {
            res.json(err)
          } else {
            res.json({'success': 'weee'})
          }
        })
      }
    })
  },
  // Change user information with given id
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Remove user with id
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Push to user with given id's socialNetworks array
  addNetwork: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$push: {socialNetworks: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Remove network with data of req.body from user with id
  removeNetwork: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$pull: {socialNetworks: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Add friend with id to user with id
  addFriend: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$push: {friends: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Remove friend with id from user with id
  removeFriend: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$pull: {friends: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}