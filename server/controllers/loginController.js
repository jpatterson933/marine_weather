const db = require("../models");
const Bcrypt = require("bcryptjs");
// import necessary utilitiy modules
const defaultTimer = require("../utils/timer");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

require('dotenv').config();

module.exports = {
    async loginSurfer(req, res) {
        try {
            const dbSurferLogin = await db.Surfer.findOne({
                userName: req.body.username,
            });

            if (!dbSurferLogin) {
                return res.status(400).send({ message: "The surfer does not exist!" });
            };
            if (!Bcrypt.compareSync(req.body.password, dbSurferLogin.userPassword)) {
                return res.status(400).send({ message: "The password is invalid" });
            };
            // set up our session variables
            req.session.user_id = dbSurferLogin._id;
            req.session.logged_in = true;
            req.session.token_expiration = new Date().getTime() + defaultTimer; // set the token expiration time in session storage
            res.status(200).json({ user: dbSurferLogin, message: "You are now logged in!", session_id: req.sessionID });

        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        };
    },
    async checkSession(req, res) { // a direct line to check if a session is still active - to utilize on frontend
        if (req.session.logged_in) {
            res.status(200).json({ logged_in: true, user_id: req.session.user_id });
        } else {
            res.status(401).json({ logged_in: false });
        };
    }
};