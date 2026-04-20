const Faculty = require("../models/Faculty")
const Subject = require("../models/Subject")

// exports.addFaculty = async (req, res) => {
//     try{
//         const faculty = new Faculty(req.body)
//         await faculty.save()
//         res.json(faculty)
//     }catch(err){
//         res.status(500).json({error: err.message})
//     }
// }

exports.addFaculty = async (req, res) => {
  try {
    const { name, department, subjects, availability } = req.body

    const faculty = new Faculty({
      name,
      department,
      subjects,
      availability
    })

    await faculty.save()

    res.json({ message: "Faculty added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getFaculty = async (req, res) => {
    const faculty = await Faculty.find()
    res.json(faculty)
}

// exports.deleteFaculty = async (req, res) => {
//     try {
//         await Faculty.findByIdAndDelete(req.params.id)
//         res.json({ message: "Faculty deleted successfully" })
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// }

exports.deleteFaculty = async (req, res) => {
  try {
    const id = req.params.id

    // 🔥 CHECK IF FACULTY USED IN SUBJECT
    const isUsed = await Subject.findOne({ faculty_id: id })

    if (isUsed) {
      return res.status(400).json({
        error: "Cannot delete faculty. It is assigned to a subject ❌"
      })
    }

    // ✅ SAFE TO DELETE
    await Faculty.findByIdAndDelete(id)

    res.json({ message: "Faculty deleted successfully ✅" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find()
    res.json(faculty)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}