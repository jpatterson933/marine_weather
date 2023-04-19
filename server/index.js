const express = require("express");
const expressSession = require("express-session");
// middleware funciton grabbed from utils
const { checkSessionExpiration } = require("./utils/sessionManagement");
const { defaultTimer } = require("./utils/timer");
// grab cookie parser package
// const cookieParser = require("cookie-parser");
console.log(defaultTimer, "---------------------------------------")
// setup db connection
const db = require('./config/connection')


// enable cors since we are using different 
const cors = require("cors");
// const mongoose = require("mongoose");
const routes = require('./routes')
const app = express();
const PORT = process.env.PORT || 3001;

// const session = require ('express-session')
// var Store = require('express-session').Store;
// var MongooseStore = require('mongoose-express-session')(Store);


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession({
    secret: 'keyring doggies',
    resave: false, // must be false due to deprecation
    saveUninitialized: false, // can be true or false - well get rid of the deprecation warning // use false if you do not want to store sessions for unauthenticated users
    rolling: false,
    cookie: {
        maxAge: defaultTimer,
        default: {
            token_expiration: new Date().getTime() + (60 * 1000)
        }
    }
}))

// put middleware into app
app.use(checkSessionExpiration);
// app.use(cookieParser());

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }
// use cors
app.use(cors());
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB /need to make changes once we have a mongo database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/marine_db");


// error catching for db connection
db.on("error", (error) => {
    console.log(error, "error with stuff")
})


db.once("open", () => {
    app.on("session.destroy", (sessionId) => {
        console.log(`Session ${sessionId} has expired!`)
    })


    //app running, not getting
    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on http://localhost:${PORT}`, "SERVER LIVE");
    });


})