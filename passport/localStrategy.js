const db = require('../models')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	function(username, password, done) {
		console.log('local strat')
		db.User.findOne({ email: username }, (err, user) => {
			console.log('user findone local strat: ' + user)
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy