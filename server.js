const express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') 
const passport = require('./passport')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./routes")
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
require("dotenv").config()
// Serve up static assets
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(morgan('dev'))
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to the Mongo DB
app.use(
  session({
  secret: process.env.SECRET || 'pxoqgcgoewrs', // random string to make the hash that is generated secure
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, //required
  saveUninitialized: false //required
  })
)
// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

// Add routes, both API and view
app.use(routes)

app.get("*", (req, res) => {  
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})
