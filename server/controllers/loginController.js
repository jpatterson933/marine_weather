const db = require("../models");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = {
    async loginSurfer(req, res) {
        try {
            const dbSurferLogin = await db.Surfer.findOne({
                userName: req.body.username,
            })

            if (!dbSurferLogin) {
                return res.status(400).send({ message: "The surfer does not exist!" });
            }
            if (!Bcrypt.compareSync(req.body.password, dbSurferLogin.userPassword)) {
                return res.status(400).send({ messag: "The password is invalid" });
            }
            // here is our jwt token
            let userToken = jwt.sign({
                data: dbSurferLogin
            }, process.env.JWT_TOKEN_KEY, {expiresIn: 60 * 60})

            res.json({ user: dbSurferLogin, message: "You are now logged in!", token: userToken})
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}