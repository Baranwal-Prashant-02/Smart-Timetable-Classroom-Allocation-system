// const express = require("express")
// const router = express.Router()

// const timetableController = require("../controllers/timetableController")

// router.get("/generate", timetableController.generateTimetable) // the basic scheduler routing code although it is just for testing 

// router.get("/generate-ai", timetableController.generateTimetableAI)   // the OR-Tools routing code

// module.exports = router

const express = require("express")
const router = express.Router()

const timetableController = require("../controllers/timetableController")
const Timetable = require("../models/Timetable")   // ✅ ADD THIS

// existing routes
router.get("/generate", timetableController.generateTimetable)
router.get("/generate-ai", timetableController.generateTimetableAI)

// 🔥 ADD THIS NEW ROUTE (IMPORTANT)
router.get("/all", async (req, res) => {
    try {
        const data = await Timetable.find()
            .populate("subject_id")
            .populate("faculty_id")
            .populate("classroom_id")
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router