const mongoose = require("mongoose")

const SubjectSchema = new mongoose.Schema({
    subject_name: String,
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    hours_per_week: Number,
    type: String
})

module.exports = mongoose.model("Subject", SubjectSchema)