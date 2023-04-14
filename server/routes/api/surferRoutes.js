const router = require("express").Router();

const { 
    createSurfer,
    getSurfer
 } = require("../../controllers/surferController");

router.route("/").post(createSurfer);
router.route("/:surferId").get(getSurfer) // for a specific player, we can also have the put/update and delete routes here

module.exports = router;