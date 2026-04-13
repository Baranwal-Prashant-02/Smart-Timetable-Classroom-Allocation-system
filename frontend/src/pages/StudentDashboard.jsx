// import React, { useEffect, useState } from "react"
// import { getTimetable } from "../services/api"
// import TimetableGrid from "../components/TimetableGrid"

// const StudentDashboard = () => {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     getTimetable().then(setData)
//   }, [])

//   return (
//     <div>
//       <h2>Student Timetable</h2>
//       <TimetableGrid data={data} />
//     </div>
//   )
// }

// export default StudentDashboard

import React, { useEffect, useState } from "react"
import { getTimetable } from "../services/api"
import TimetableGrid from "../components/TimetableGrid"

const StudentDashboard = () => {
  
  const [data, setData] = useState([])
  const [section, setSection] = useState("")

  useEffect(() => {
    getTimetable().then(setData)
  }, [])

  // 🔥 logout
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  // 🔥 filter by section
  const filteredData = data.filter(
    item => item.section === section
  )

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student Timetable</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* DROPDOWN */}
      <select
        onChange={(e) => setSection(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="">Select Section</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
      </select>

      {/* TIMETABLE */}
      <TimetableGrid data={filteredData} />

    </div>
  )
}

export default StudentDashboard