const express = require("express")
const router = express.Router()

const subjectController = require("../controllers/subjectController")

router.post("/add", subjectController.addSubject)
router.get("/all", subjectController.getSubjects)
router.delete("/delete/:id", subjectController.deleteSubject)

module.exports = router