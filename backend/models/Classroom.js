const mongoose = require("mongoose")

const ClassroomSchema = new mongoose.Schema({
    room_no: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["theory", "lab", "smart"],
        required: true
    }
})

module.exports = mongoose.model("Classroom", ClassroomSchema)