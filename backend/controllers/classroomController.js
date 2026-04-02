const Classroom = require("../models/Classroom")

// Add Classroom
exports.addClassroom = async (req, res) => {
    try {
        const classroom = new Classroom(req.body)
        await classroom.save()
        res.json(classroom)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get All Classrooms
exports.getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find()
        res.json(classrooms)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Classroom
exports.deleteClassroom = async (req, res) => {
    try {
        await Classroom.findByIdAndDelete(req.params.id)
        res.json({ message: "Classroom deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}