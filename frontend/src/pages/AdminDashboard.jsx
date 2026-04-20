// import React from "react"
// import { generateTimetable } from "../services/api"

// const AdminDashboard = () => {

//   const handleGenerate = async () => {
//     await generateTimetable()
//     alert("Timetable Generated")
//   }

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>

//       <button onClick={handleGenerate}>
//         Generate Timetable
//       </button>
//     </div>
//   )
// }

// export default AdminDashboard

import React, { useEffect, useState } from "react"
import { getTimetable, generateTimetable } from "../services/api"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import FacultyPanel from "../components/FacultyPanel"
import SubjectPanel from "../components/SubjectPanel"
import ClassroomPanel from "../components/ClassroomPanel"
import BatchPanel from "../components/BatchPanel"

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState("")

  const [data, setData] = useState([])

  useEffect(() => {
    getTimetable().then(setData)
  }, [])


  // 🔥 logout here (better readability)
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleGenerate = async () => {
    await generateTimetable()
    alert("Timetable Generated")

    const updated = await getTimetable()
    setData(updated)
  }

  // ================= ANALYTICS =================

  const facultyLoad = {}

  data.forEach(item => {
    const name = item.faculty_id?.name || "Unknown"
    facultyLoad[name] = (facultyLoad[name] || 0) + 1
  })

  const overloaded = Object.entries(facultyLoad).filter(
    ([name, count]) => count > 8
  )

  const slotCount = {}

  data.forEach(item => {
    const key = `${item.day} - Slot ${item.slot}`
    slotCount[key] = (slotCount[key] || 0) + 1
  })

  const peakSlots = Object.entries(slotCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const chartData = Object.entries(facultyLoad).map(([name, count]) => ({
    name,
    classes: count
  }))

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* 🔥 GENERATE + ADMIN BUTTONS IN ONE LINE */}
        <div className="flex items-center gap-4 mb-6">

          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Generate Timetable
          </button>

          <button 
            onClick={() => setActivePanel(activePanel === "faculty" ? "" : "faculty")}
            className="bg-green-500 text-white px-3 py-2 rounded whitespace-nowrap">
            Manage Faculty
          </button>

          <button 
            onClick={() => setActivePanel(activePanel === "subjects" ? "" : "subjects")}
            className="bg-purple-500 text-white px-3 py-2 rounded whitespace-nowrap">
            Manage Subjects
          </button>

          <button 
            onClick={() => setActivePanel(activePanel === "classrooms" ? "" : "classrooms")}
            className="bg-yellow-500 text-white px-3 py-2 rounded whitespace-nowrap">
            Manage Classrooms
          </button>

          <button 
            onClick={() => setActivePanel(activePanel === "batches" ? "" : "batches")}
            className="bg-pink-500 text-white px-3 py-2 rounded whitespace-nowrap">
            Manage Batches
          </button>

        </div>
      {activePanel === "faculty" && <FacultyPanel />}  
      {activePanel === "subjects" && <SubjectPanel />}
      {activePanel === "classrooms" && <ClassroomPanel />}
      {activePanel === "batches" && <BatchPanel />}

      {/* <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Timetable
      </button> */}

      {/* ================= FACULTY LOAD ================= */}
      <h3 className="text-xl mb-3">📊 Faculty Load</h3>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(facultyLoad).map(([name, count]) => (
          <div key={name} className="bg-gray-100 p-3 rounded shadow">
            <div className="font-bold">{name}</div>
            <div>{count} classes/week</div>
          </div>
        ))}
      </div>

      {/* ================= OVERLOADED ================= */}
      <h3 className="text-xl mt-6 mb-2">⚠ Overloaded Teachers</h3>

      {overloaded.length === 0 ? (
        <p className="text-green-600">All teachers are balanced ✅</p>
      ) : (
        overloaded.map(([name, count]) => (
          <div key={name} className="bg-red-100 p-2 rounded mb-2">
            {name} → {count} classes
          </div>
        ))
      )}

      {/* ================= PEAK SLOTS ================= */}
      <h3 className="text-xl mt-6 mb-2">⏰ Peak Time Slots</h3>

      {peakSlots.map(([slot, count]) => (
        <div key={slot} className="bg-yellow-100 p-2 rounded mb-2">
          {slot} → {count} classes running
        </div>
      ))}

      {/* ================= CHART ================= */}
      <h3 className="text-xl mt-6 mb-2">📊 Faculty Load Chart</h3>

      <div className="bg-white p-4 rounded shadow w-fit">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="classes" />
        </BarChart>
      </div>

    </div>
  )
}

export default AdminDashboard