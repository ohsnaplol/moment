//Connect to Mongo database
const mongoose = require('mongoose')

//your local database url
//27017 is the default mongoDB port
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/moment"

mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection