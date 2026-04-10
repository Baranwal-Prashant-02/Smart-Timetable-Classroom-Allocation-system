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

  // 🔥 filter by section
  const filteredData = data.filter(
    item => item.section === section
  )

  return (
    <div>
      <h2>Student Timetable</h2>

      {/* SECTION DROPDOWN */}
      <select onChange={(e) => setSection(e.target.value)}>
        <option value="">Select Section</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
      </select>

      <TimetableGrid data={filteredData} />
    </div>
  )
}

export default StudentDashboard