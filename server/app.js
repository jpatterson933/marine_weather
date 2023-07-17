const express = require("express");
const expressSession = require("express-session");
// middleware funciton grabbed from utils
const { checkSessionExpiration } = require("./utils/sessionManagement");
const { defaultTimer } = require("./utils/timer");


// Connect to the Mongo DB /need to make changes once we have a mongo database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/marine_db");


// enable cors since we are using different 
const cors = require("cors");

// const mongoose = require("mongoose");
const routes = require('./routes')
const app = express();

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
}));


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

module.exports = app;