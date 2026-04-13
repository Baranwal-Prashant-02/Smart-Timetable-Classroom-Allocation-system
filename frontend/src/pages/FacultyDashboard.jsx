
import React, { useEffect, useState } from "react"
import Select from "react-select"
import { getTimetable, getFaculty } from "../services/api"
import TimetableGrid from "../components/TimetableGrid"

const FacultyDashboard = () => {

  const [data, setData] = useState([])
  const [facultyList, setFacultyList] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  useEffect(() => {
    getTimetable().then(setData)
    getFaculty().then(setFacultyList)
  }, [])

  // 🔥 convert faculty to dropdown options
  const options = facultyList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(f => ({
      value: f._id,
      label: f.name
    }))

  // 🔥 filter timetable
  const filteredData = data.filter(
    item => item.faculty_id?._id === selectedFaculty?.value
  )

  return (
    <div>
      <h2>Faculty Dashboard</h2>

      {/* 🔥 SEARCHABLE DROPDOWN */}
      <div style={{ width: "250px", marginBottom: "20px" }}>
        <Select
          options={options}
          placeholder="Select or Search Faculty..."
          onChange={(selected) => setSelectedFaculty(selected)}
          isSearchable={true}
        />
      </div>

      <TimetableGrid data={filteredData} />
    </div>
  )
}

export default FacultyDashboard