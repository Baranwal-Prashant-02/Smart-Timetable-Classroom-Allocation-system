const Classroom = require("../models/Classroom")

// Add Classroom
// exports.addClassroom = async (req, res) => {
//     try {
//         const classroom = new Classroom(req.body)
//         await classroom.save()
//         res.json(classroom)
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// }

exports.addClassroom = async (req, res) => {
    try {
        const { room_no, capacity, type } = req.body

        // ✅ VALIDATION
        if (!room_no || !capacity || !type) {
            return res.status(400).json({ error: "All fields required" })
        }

        // 🔥 CHECK DUPLICATE ROOM (ADD HERE)
        const exists = await Classroom.findOne({ room_no })
        if (exists) {
            return res.status(400).json({ error: "Room already exists ❌" })
        }

        // ✅ VALID TYPE
        if (!["theory", "lab", "smart"].includes(type)) {
            return res.status(400).json({ error: "Invalid classroom type" })
        }

        // ✅ SAVE
        const classroom = new Classroom({
            room_no,
            capacity,
            type
        })

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