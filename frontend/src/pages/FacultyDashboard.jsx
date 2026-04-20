import React, { useEffect, useState } from "react"
import Select from "react-select"
import { getTimetable, getFaculty, getBatches } from "../services/api"
import TimetableGrid from "../components/TimetableGrid"

const FacultyDashboard = () => {

  const [data, setData] = useState([])
  const [facultyList, setFacultyList] = useState([])
  const [batchList, setBatchList] = useState([])

  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState({
    value: "all",
    label: "All Batches"
  })

  useEffect(() => {
    getTimetable().then(setData)
    getFaculty().then(setFacultyList)
    getBatches().then(setBatchList)
  }, [])


  
  // 🔥 Faculty dropdown options
  const facultyOptions = facultyList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(f => ({
      value: f._id,
      label: f.name
    }))

  // 🔥 Batch dropdown options
  const batchOptions = [
    { value: "all", label: "All Batches" },
    ...batchList.map(b => ({
      value: b._id,
      label: `${b.course} - ${b.section}`
    }))
  ]

  // 🔥 FINAL FILTER
  const filteredData = data.filter(item => {

    const facultyMatch =
      item.faculty_id?._id === selectedFaculty?.value

    const batchMatch =
      selectedBatch.value === "all" ||
      item.batch_id === selectedBatch.value

    return facultyMatch && batchMatch
  })

  return (
    <div>
      <h2>Faculty Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

        {/* FACULTY */}
        <div style={{ width: "250px" }}>
          <Select
            options={facultyOptions}
            placeholder="Select Faculty..."
            onChange={(selected) => setSelectedFaculty(selected)}
            isSearchable={true}
          />
        </div>

        {/* BATCH */}
        <div style={{ width: "250px" }}>
          <Select
            options={batchOptions}
            value={selectedBatch}
            onChange={(selected) => setSelectedBatch(selected)}
            isSearchable={false}
          />
        </div>

      </div>

      <TimetableGrid data={filteredData} />
    </div>
  )
}

export default FacultyDashboard