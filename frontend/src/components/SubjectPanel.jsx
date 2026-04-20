import React, { useEffect, useState } from "react"
import { getFaculty } from "../services/api"

const SubjectPanel = () => {

  const [subjectName, setSubjectName] = useState("")
  const [facultyList, setFacultyList] = useState([])
  const [filteredFaculty, setFilteredFaculty] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [hours, setHours] = useState("")
  const [type, setType] = useState("theory")
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getFaculty().then(setFacultyList)
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    const res = await fetch("http://localhost:5000/subjects/all")
    const data = await res.json()
    setSubjects(data)
  }

  // 🔥 FILTER FACULTY BASED ON SUBJECT
  useEffect(() => {
    if (!subjectName) {
      setFilteredFaculty([])
      return
    }

    const filtered = facultyList.filter(f =>
      f.subjects?.some(sub =>
        sub.toLowerCase().includes(subjectName.toLowerCase())
      )
    )

    setFilteredFaculty(filtered)
  }, [subjectName, facultyList])

  const handleAddSubject = async () => {

    const res = await fetch("http://localhost:5000/subjects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject_name: subjectName,
        faculty_id: selectedFaculty,
        hours_per_week: Number(hours),
        type
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Subject Added ✅")

    setSubjectName("")
    setSelectedFaculty("")
    setHours("")
    setType("theory")

    loadSubjects()
  }

  const handleDelete = async (id) => {

    const res = await fetch(`http://localhost:5000/subjects/delete/${id}`, {
        method: "DELETE"
    })

    const data = await res.json()

    if (!res.ok) {
        alert(data.error)   // ❌ error case
        return
    }

    alert(data.message)   // ✅ success popup

    loadSubjects()        // 🔄 refresh list
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">

      <h3 className="text-lg font-bold mb-3">Manage Subjects</h3>

      {/* FORM */}
      <div className="flex flex-col gap-2 mb-4">

        <input
          placeholder="Subject Name (e.g. DBMS)"
          className="border p-2"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <select
          className="border p-2"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">Select Faculty</option>

          {filteredFaculty.map(f => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Hours per week"
          className="border p-2"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="theory">Theory</option>
          <option value="lab">Lab</option>
        </select>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={handleAddSubject}
        >
          Add Subject
        </button>

      </div>

      {/* LIST */}
      <div>
        {subjects.map(sub => (
          <div key={sub._id} className="bg-white p-2 mb-2 rounded flex justify-between">

            <div>
              <b>{sub.subject_name}</b> → {sub.faculty_name} <br />
              {sub.hours_per_week} hrs | {sub.type}
            </div>

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => handleDelete(sub._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default SubjectPanel