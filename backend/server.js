const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const facultyRoutes = require("./routes/facultyRoutes")
const subjectRoutes = require("./routes/subjectRoutes")
const classroomRoutes = require("./routes/classroomRoutes")
const batchRoutes = require("./routes/batchRoutes")


const timetableRoutes = require("./routes/timetableRoutes")


const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/timetableDB")

app.use("/faculty", facultyRoutes)

app.use("/subjects", subjectRoutes)

app.use("/classrooms", classroomRoutes)

app.use("/batches", batchRoutes)



app.use("/timetable", timetableRoutes)

app.get("/", (req,res)=>{
    res.send("Smart Timetable Scheduler API Running")
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})

//to run the backend server 
// use:-  "node backend/server.js"


// to run the frontend server 
//use :- "cd frontend"  then "npm start"
