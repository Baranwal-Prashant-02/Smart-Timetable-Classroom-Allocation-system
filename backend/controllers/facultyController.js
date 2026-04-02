const Faculty = require("../models/Faculty")

exports.addFaculty = async (req, res) => {
    try{
        const faculty = new Faculty(req.body)
        await faculty.save()
        res.json(faculty)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.getFaculty = async (req, res) => {
    const faculty = await Faculty.find()
    res.json(faculty)
}

exports.deleteFaculty = async (req, res) => {
    try {
        await Faculty.findByIdAndDelete(req.params.id)
        res.json({ message: "Faculty deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}