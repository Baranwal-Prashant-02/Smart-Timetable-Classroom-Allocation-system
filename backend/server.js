const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const facultyRoutes = require("./routes/facultyRoutes")
const subjectRoutes = require("./routes/subjectRoutes")
const classroomRoutes = require("./routes/classroomRoutes")
const batchRoutes = require("./routes/batchRoutes")
const authRoutes = require("./routes/authRoutes")


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

app.use("/auth", authRoutes)

app.get("/", (req,res)=>{
    res.send("Smart Timetable Scheduler API Running")
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})

//to run the backend server in different terminal 
// use:-  "node backend/server.js"


// to run the frontend server  at different terminal
//use :- "cd frontend"  then "npm start"
// both 

/*
we must start both separately

backend:👉 Handles:
Database
AI (Python)
API routes


frontend :👉 Handles
UI
Buttons
Tables

“We use a decoupled architecture where frontend and backend run as independent services, allowing scalability, flexibility, and easier maintenance.”
*/