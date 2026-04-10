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