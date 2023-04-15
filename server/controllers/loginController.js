const db = require("../models");
const Bcrypt = require("bcryptjs");

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

            // req.session.save(() => {
            //     req.session.user_id = theSurfer._id;
            //     req.session.logged_in = true;
            //     res.json({ user: theSurfer, message: "You are now logged in!" });
            // })
            res.json({ user: dbSurferLogin, message: "You are now logged in!"})
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}