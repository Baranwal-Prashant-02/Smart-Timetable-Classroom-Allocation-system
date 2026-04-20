import React, { useEffect, useState } from "react"
// import { addFaculty, getFaculty, deleteFaculty } from "../services/api"
import { addFaculty, getFaculty } from "../services/api"
const FacultyPanel = () => {

  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [subjects, setSubjects] = useState("")
  const [availability, setAvailability] = useState([])

  const [list, setList] = useState([])

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const loadFaculty = async () => {
    const data = await getFaculty()
    setList(data)
  }

  useEffect(() => {
    loadFaculty()
  }, [])

  const handleCheckbox = (day) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day))
    } else {
      setAvailability([...availability, day])
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">

      <h3 className="text-lg font-bold mb-3">Manage Faculty</h3>

      {/* FORM */}
      <div className="flex flex-col gap-2 mb-4">

        <input
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Department"
          className="border p-2"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          placeholder="Subjects (comma separated)"
          className="border p-2"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
        />

        {/* AVAILABILITY */}
        <div>
          <p className="font-semibold">Availability:</p>
          {days.map(day => (
            <label key={day} className="mr-3">
              <input
                type="checkbox"
                checked={availability.includes(day)}
                onChange={() => handleCheckbox(day)}
              />
              {day}
            </label>
          ))}
        </div>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={async () => {

            await addFaculty({
              name,
              department,
              subjects: subjects.split(",").map(s => s.trim()),
              availability
            })

            alert("Faculty Added ✅")

            setName("")
            setDepartment("")
            setSubjects("")
            setAvailability([])

            loadFaculty()
          }}
        >
          Add Faculty
        </button>
      </div>

      {/* LIST */}
      <div>
        {list.map(f => (
          <div key={f._id} className="flex justify-between bg-white p-2 mb-2 rounded">
            <div>
              <b>{f.name}</b> ({f.department}) <br />
              Subjects: {f.subjects?.join(", ")} <br />
              Availability: {f.availability?.join(", ")}
            </div>

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={async () => {

                const res = await fetch(`http://localhost:5000/faculty/${f._id}`, {
                  method: "DELETE"
                })

                const data = await res.json()

                if (!res.ok) {
                  alert(data.error) // 🔥 shows error if faculty is used
                  return
                }

                alert("Deleted Successfully ✅")
                loadFaculty()
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FacultyPanel