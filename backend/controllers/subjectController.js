const Subject = require("../models/Subject")

exports.addSubject = async (req, res) => {
    try {

        const { subject_name, faculty_id, hours_per_week, type } = req.body

        // ✅ FULL VALIDATION
        if (!subject_name || !faculty_id || !hours_per_week || !type) {
            return res.status(400).json({ error: "All fields required" })
        }

        // ✅ type must be theory or lab
        if (!["theory", "lab"].includes(type)) {
            return res.status(400).json({ error: "Invalid subject type" })
        }

        // ✅ lab must have even hours
        if (type === "lab" && hours_per_week % 2 !== 0) {
            return res.status(400).json({ error: "Lab must have even hours" })
        }

        const subject = new Subject(req.body)
        await subject.save()

        res.json(subject)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getSubjects = async (req, res) => {
    const subjects = await Subject.find()
        .populate("faculty_id", "name") // only fetch name

    const formatted = subjects.map(sub => ({
        _id: sub._id,
        subject_name: sub.subject_name,
        faculty_id: sub.faculty_id?._id,
        faculty_name: sub.faculty_id?.name || "Unknown",
        hours_per_week: sub.hours_per_week,
        type: sub.type
    }))

    res.json(formatted)
}

exports.deleteSubject = async (req, res) => {
    try {
        const id = req.params.id
        await Subject.findByIdAndDelete(id)
        res.json({ message: "Subject deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}