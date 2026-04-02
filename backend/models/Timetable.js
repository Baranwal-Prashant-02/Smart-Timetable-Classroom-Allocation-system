// it is temperory code just as basic and simple one for understanding 

const mongoose = require("mongoose")

const TimetableSchema = new mongoose.Schema({
    batch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom"
    },
    day: String,
    slot: Number
})

module.exports = mongoose.model("Timetable", TimetableSchema)