const express = require("express")
const router = express.Router()

const batchController = require("../controllers/batchController")

router.post("/add", batchController.addBatch)
router.get("/all", batchController.getBatches)
router.delete("/delete/:id", batchController.deleteBatch)

module.exports = router