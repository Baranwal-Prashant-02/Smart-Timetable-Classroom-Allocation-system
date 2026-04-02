const Batch = require("../models/Batch")

// Add Batch
exports.addBatch = async (req, res) => {
    try {
        const batch = new Batch(req.body)
        await batch.save()
        res.json(batch)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get All Batches
exports.getBatches = async (req, res) => {
    try {
        const batches = await Batch.find()
        res.json(batches)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Batch
exports.deleteBatch = async (req, res) => {
    try {
        await Batch.findByIdAndDelete(req.params.id)
        res.json({ message: "Batch deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}