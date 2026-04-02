const mongoose = require("mongoose")

const BatchSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    strength: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Batch", BatchSchema)