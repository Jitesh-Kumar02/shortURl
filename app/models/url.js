const MONGOOSE = require("mongoose");

const URLSchema = new MONGOOSE.Schema({
    shortURL: String,
    longURL: String
}, {timestamps: true, versionKey: false});

module.exports = new MONGOOSE.model("url", URLSchema);
