const express = require("express")
const session = require('express-session')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./routes")
const app = express()
const PORT = process.env.PORT || 3001

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
  secret: 'pxoqgcgoewrs', // random string to make the hash that is generated secure
  resave: false, //required
  saveUninitialized: false //required
  })
)
// Serve up static assets
app.use(express.static("client/build"))
app.use(morgan('dev'))
// Add routes, both API and view
app.use(routes)

// tutorial
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  next()
})

// Set up promises with mongoose
mongoose.Promise = global.Promise
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/moment")

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})
