const Timetable = require("../models/Timetable")  
const Batch = require("../models/Batch")
const Subject = require("../models/Subject")
const Classroom = require("../models/Classroom")
const Faculty = require("../models/Faculty")

const { spawn } = require("child_process")

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
const slots = [1,2,3,4,5]



// ================= BASIC AI =================
// exports.generateTimetable = async (req, res) => {
//     try {
//         await Timetable.deleteMany()

//         const batches = await Batch.find()
//         const subjects = await Subject.find()
//         const classrooms = await Classroom.find()

//         let timetable = []

//         for (let batch of batches) {
//             for (let subject of subjects) {

//                 for (let i = 0; i < subject.hours_per_week; i++) {

//                     let assigned = false

//                     while (!assigned) {

//                         let day = days[Math.floor(Math.random() * days.length)]
//                         let slot = slots[Math.floor(Math.random() * slots.length)]

//                         let room = classrooms[Math.floor(Math.random() * classrooms.length)]

//                         const conflict = await Timetable.findOne({
//                             $or: [
//                                 { day, slot, classroom_id: room._id },
//                                 { day, slot, faculty_id: subject.faculty_id },
//                                 { day, slot, batch_id: batch._id },
//                                 { day, batch_id: batch._id, subject_id: subject._id }
//                             ]
//                         })

//                         if (!conflict) {
//                             const entry = new Timetable({
//                                 batch_id: batch._id,
//                                 subject_id: subject._id,
//                                 faculty_id: subject.faculty_id,
//                                 classroom_id: room._id,
//                                 day,
//                                 slot
//                             })

//                             await entry.save()
//                             timetable.push(entry)

//                             assigned = true
//                         }
//                     }
//                 }
//             }
//         }

//         res.json({ message: "Basic Timetable Generated", timetable })

//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// }



// ================= OR-TOOLS AI =================
exports.generateTimetableAI = async (req, res) => {
    try {
        await Timetable.deleteMany()

        const batches = await Batch.find().lean()
        const subjects = await Subject.find().lean()
        const classrooms = await Classroom.find().lean()
        const faculty = await Faculty.find().lean()
        

        // ✅ FIXED PATH (important)
        const python = spawn("python", ["optimizer/scheduler.py"])

        const inputData = JSON.stringify({
            batches,
            subjects,
            classrooms,
            faculty 
        })

        python.stdin.write(inputData)
        python.stdin.end()

        let result = ""

        // ✅ DEBUG OUTPUT
        python.stdout.on("data", (data) => {
            console.log("RAW PYTHON OUTPUT:", data.toString())   // 👈 DEBUG
            result += data.toString()
        })

        // ✅ DEBUG ERROR
        python.stderr.on("data", (err) => {
            console.error("PYTHON ERROR:", err.toString())
        })

        python.on("close", async () => {
            try {
                if (!result) {
                    return res.status(500).json({ error: "No output from AI" })
                }

                let cleaned = result.trim()

                const timetableData = JSON.parse(cleaned)

                if (timetableData.error) {
                    return res.status(500).json({ error: timetableData.error })
                }

                for (let entry of timetableData) {

                // ✅ SKIP FREE SLOTS (VERY IMPORTANT)
                    if (entry.subject_id === "FREE") continue;

                    const newEntry = new Timetable({
                        batch_id: entry.batch_id,
                        section: entry.section,
                        subject_id: entry.subject_id,
                        faculty_id: entry.faculty_id,
                        classroom_id: entry.classroom_id,
                        day: entry.day,
                        slot: entry.slot
                    })

                    await newEntry.save()
                }

                res.json({ message: "AI Timetable Generated Successfully" })

            } catch (parseError) {
                console.error("PARSE ERROR:", parseError)
                res.status(500).json({ error: "Invalid JSON from Python" })
            }
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}