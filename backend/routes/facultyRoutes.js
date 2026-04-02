const express = require("express")
const router = express.Router()

const facultyController = require("../controllers/facultyController")

router.post("/add", facultyController.addFaculty)
router.get("/all", facultyController.getFaculty)
router.delete("/delete/:id", facultyController.deleteFaculty)

module.exports = router