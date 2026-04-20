import React, { useEffect, useState } from "react"

const BatchPanel = () => {

  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [section, setSection] = useState("")
  const [strength, setStrength] = useState("")

  const [list, setList] = useState([])

  const loadBatches = async () => {
    const res = await fetch("http://localhost:5000/batches/all")
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    loadBatches()
  }, [])

  const handleAdd = async () => {

    const res = await fetch("http://localhost:5000/batches/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        course,
        year,
        section,
        strength: Number(strength)
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Batch Added ✅")

    setCourse("")
    setYear("")
    setSection("")
    setStrength("")

    loadBatches()
  }

  const handleDelete = async (id) => {

    const res = await fetch(`http://localhost:5000/batches/delete/${id}`, {
      method: "DELETE"
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Deleted ✅")
    loadBatches()
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">

      <h3 className="text-lg font-bold mb-3">Manage Batches</h3>

      {/* FORM */}
      <div className="flex flex-col gap-2 mb-4">

        <input
          placeholder="Course (e.g. B.Tech)"
          className="border p-2"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          placeholder="Year (e.g. 2)"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          placeholder="Section (e.g. A1)"
          className="border p-2"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        <input
          type="number"
          placeholder="Strength"
          className="border p-2"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={handleAdd}
        >
          Add Batch
        </button>

      </div>

      {/* LIST */}
      <div>
        {list.map(b => (
          <div key={b._id} className="flex justify-between bg-white p-2 mb-2 rounded">

            <div>
              <b>{b.course}</b> | Year {b.year} | Section {b.section} <br />
              Strength: {b.strength}
            </div>

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => handleDelete(b._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default BatchPanel