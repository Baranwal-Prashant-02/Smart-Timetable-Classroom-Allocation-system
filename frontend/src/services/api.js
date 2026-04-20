import axios from "axios"

const BASE_URL = "http://localhost:5000"

export const getTimetable = async () => {
  const res = await axios.get(`${BASE_URL}/timetable/all`)
  return res.data
}

export const generateTimetable = async () => {
  const res = await axios.get(`${BASE_URL}/timetable/generate-ai`)
  return res.data
}

export const getClassrooms = async () => {
  const res = await fetch("http://localhost:5000/classroom/all")
  return res.json()
}

export const getFaculty = async () => {
  const res = await fetch("http://localhost:5000/faculty/all")
  return res.json()
}


export const deleteFaculty = async (id) => {
  const res = await fetch(`http://localhost:5000/faculty/delete/${id}`, {
    method: "DELETE"
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error)

  return data
}

export const addFaculty = async (facultyData) => {
  const res = await fetch("http://localhost:5000/faculty/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(facultyData)
  })

  return res.json()
}

export const getBatches = async () => {
  const res = await fetch("http://localhost:5000/batches/all")
  return res.json()
}