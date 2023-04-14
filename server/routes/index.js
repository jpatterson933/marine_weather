const router = require("express").Router();
const apiRoutes = require("./api");

// instantantiate api route
router.use("/api", apiRoutes);

router.use((req, res) => {
    return res.send("Wrong Routes? Need to test this 4/7")
});

module.exports = router;