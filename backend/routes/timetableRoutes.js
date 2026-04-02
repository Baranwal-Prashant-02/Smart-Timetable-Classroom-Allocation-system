const express = require("express")
const router = express.Router()

const timetableController = require("../controllers/timetableController")

router.get("/generate", timetableController.generateTimetable) // the basic scheduler routing code although it is just for testing 

router.get("/generate-ai", timetableController.generateTimetableAI)   // the OR-Tools routing code

module.exports = router