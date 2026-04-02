const express = require("express")
const router = express.Router()

const classroomController = require("../controllers/classroomController")

router.post("/add", classroomController.addClassroom)
router.get("/all", classroomController.getClassrooms)
router.delete("/delete/:id", classroomController.deleteClassroom)

module.exports = router