const db = require("../config/connection");
const { Surfer } = require("../models");

const surferTypeData = require("./surferData.json");

db.once("open", async () => {
    // empty databases
    await Surfer.deleteMany({});
    // insert data into databases
    for (const surferData of surferTypeData) {
        const newSurfer = new Surfer(surferData);
        await newSurfer.save();
      }
    // const surfer = await Surfer.insertMany(surferTypeData);
    // surfer.save();
    console.log("Surfers seeded!");
    process.exit(0);
})