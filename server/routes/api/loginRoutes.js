const router = require("express").Router();
const loginController = require("../../controllers/loginController");

router.route("/")
    .post(loginController.loginSurfer);

module.exports = router;