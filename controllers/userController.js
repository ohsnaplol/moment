const db = require('../models')

module.exports = {
  // Return information on every user
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Return user information with given user id
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // Create a new user
  create: function(req, res) {
    console.log('user controller create ' + req)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Change user information with given id
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
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