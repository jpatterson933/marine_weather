const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const surferSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: 6,
        maxLength: 21,
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 25,
    }
});

surferSchema.pre("save", function (next) {
    const surfer = this;
    surfer.userPassword = bcrypt.hashSync(surfer.userPassword, 10);
    return next();
})

const Surfer = model("Surfer", surferSchema);
module.exports = Surfer;