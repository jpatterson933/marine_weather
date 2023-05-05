const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const surferSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        min_length: 6,
        max_length: 21,
    },
    userPassword: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 25,
    }
});

surferSchema.pre("save", function (next) {
    const surfer = this;
    surfer.userPassword = bcrypt.hashSync(surfer.userPassword, 10);
    return next();
})

const Surfer = model("Surfer", surferSchema);
module.exports = Surfer;