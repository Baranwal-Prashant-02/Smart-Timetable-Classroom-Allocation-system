import React, { useEffect, useState } from "react"

const ClassroomPanel = () => {

  const [room_no, setRoomNo] = useState("")
  const [capacity, setCapacity] = useState("")
  const [type, setType] = useState("theory")
  const [list, setList] = useState([])

  const loadClassrooms = async () => {
    const res = await fetch("http://localhost:5000/classrooms/all")
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    loadClassrooms()
  }, [])

  const handleAdd = async () => {

    const res = await fetch("http://localhost:5000/classrooms/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        room_no,
        capacity: Number(capacity),
        type
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Classroom Added ✅")

    setRoomNo("")
    setCapacity("")
    setType("theory")

    loadClassrooms()
  }

  const handleDelete = async (id) => {

    const res = await fetch(`http://localhost:5000/classrooms/delete/${id}`, {
      method: "DELETE"
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Deleted ✅")
    loadClassrooms()
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">

      <h3 className="text-lg font-bold mb-3">Manage Classrooms</h3>

      {/* FORM */}
      <div className="flex flex-col gap-2 mb-4">

        <input
          placeholder="Room No"
          className="border p-2"
          value={room_no}
          onChange={(e) => setRoomNo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity"
          className="border p-2"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
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
          onClick={handleAdd}
        >
          Add Classroom
        </button>

      </div>

      {/* LIST */}
      <div>
        {list.map(c => (
          <div key={c._id} className="flex justify-between bg-white p-2 mb-2 rounded">

            <div>
              <b>{c.room_no}</b> | {c.capacity} seats | {c.type}
            </div>

            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => handleDelete(c._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default ClassroomPanel