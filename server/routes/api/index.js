
const router = require("express").Router();

const surferRoutes = require("./surferRoutes");

router.use("/surfers", surferRoutes);

module.exports = router;