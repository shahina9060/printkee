const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    username: { type: String, require: true},
    password: {type: String, rfequire: true}
})

module.exports = mongoose.model("Auth",authSchema);