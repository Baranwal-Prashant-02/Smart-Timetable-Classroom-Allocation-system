const mongoose = require("mongoose")

const FacultySchema = new mongoose.Schema({
    name: String,
    department: String,
    subjects: [String],
    availability: [String]
})

module.exports = mongoose.model("Faculty", FacultySchema)