const Surfer = require("../models/Surfer");

module.exports = {
    async createSurfer(req, res) {
        try {
            console.log("create surfer method")
            const dbSurferData = await Surfer.create(req.body);
            res.json(dbSurferData);
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },
    async getSurfer(req, res) {
        try {
            const dbSurferData = await Surfer.findOne({ _id: req.params.surferId });

            if(!dbSurferData) {
                return res.status(404).json({ message: "No player with this id exists!"});
            }

            res.json(dbSurferData);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}