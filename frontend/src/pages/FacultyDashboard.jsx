import React, { useEffect, useState } from "react"
import { getTimetable } from "../services/api"
import TimetableGrid from "../components/TimetableGrid"

const FacultyDashboard = () => {
  const [data, setData] = useState([])
  const [facultyId, setFacultyId] = useState("")

  useEffect(() => {
    getTimetable().then(setData)
  }, [])

  // 🔥 filter only this faculty timetable
  const filteredData = data.filter(
    item => item.faculty_id?._id === facultyId
  )

  return (
    <div>
      <h2>Faculty Dashboard</h2>

      {/* INPUT FOR FACULTY ID */}
      <input
        type="text"
        placeholder="Enter Faculty ID"
        value={facultyId}
        onChange={(e) => setFacultyId(e.target.value)}
      />

      {/* TIMETABLE */}
      <TimetableGrid data={filteredData} />

    </div>
  )
}

export default FacultyDashboard