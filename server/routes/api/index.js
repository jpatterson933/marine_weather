
const router = require("express").Router();

const surferRoutes = require("./surferRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/surfers", surferRoutes);
router.use("/login", loginRoutes);

module.exports = router;