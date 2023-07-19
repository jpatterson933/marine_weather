const Surfer = require("../models/Surfer");

module.exports = {
    async createSurfer(req, res) {
        try {
            const dbSurferData = await Surfer.create(req.body);
            res.status(200).json(dbSurferData);
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },
    async getSurfer(req, res) {
        try {
            const dbSurferData = await Surfer.findOne({ _id: req.params.surferId });

            if(!dbSurferData) {
                return res.status(404).json({ message: "No surfer with this id exists!"});
            };

            res.status(200).json(dbSurferData);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}