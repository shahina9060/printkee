const mongoose = require("mongoose");


const bannerSchema = new  mongoose.Schema({
    imageUrl:{
        type: String,
        require: true
    },
    uploadedAt: { type: Date, default: Date.now },
    // code:{
    //     type: String,
    //     require: true
    // }
})

module.exports = mongoose.model("Banner",bannerSchema)