const mongoose = require("mongoose");
// local connection to begin setup and testing
mongoose.connect("mongodb://127.0.0.1:27017/marine_db")

module.exports = mongoose.connection;