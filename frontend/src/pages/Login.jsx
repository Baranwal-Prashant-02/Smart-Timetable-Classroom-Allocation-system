import React, { useState } from "react"
import bgImage from "../assets/login-bg.png"

const Login = ({ setPage, setRole }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const validate = () => {
    if (!email.includes("@")) {
      setError("Enter valid email")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    setError("")
    return true
  }

  const handleLogin = async () => {
    if (!validate()) return

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)

      setRole(data.role)
      setPage(data.role)
    } else {
      setError(data.error || "Invalid credentials")
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-blue-900/70"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center">

        {/* 🔥 HEADING */}
        <h1 className="text-white text-3xl font-bold mb-6 text-center px-4">
          Smart Timetable & Classroom Allocation System
        </h1>

        {/* 🔥 LOGIN BOX */}
        <div className="bg-[#1e293b] text-white p-6 rounded-lg shadow-lg w-80 border border-white/10">

          <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            className={`w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none ${
              error ? "border border-red-500" : ""
            }`}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password (min 6 chars)"
            className={`w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none ${
              error ? "border border-red-500" : ""
            }`}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm mb-2 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </div>

        {/* 🔥 TIPS */}
        <div className="mt-6 bg-[#1e293b]/90 text-white p-4 rounded-lg w-80 text-sm border border-white/10">
          <h3 className="font-semibold mb-2">💡 Tips</h3>
          <ul className="list-disc ml-4 space-y-1">
            <li>Admin can manage all data and generate timetable</li>
            <li>Faculty can view their schedule</li>
            <li>Students can check timetable by batch</li>
            <li>Add data before generating timetable</li>
            <li>
              After any change in data, click generate timetable to update schedule
            </li>
          </ul>
        </div>

        {/* 🔥 FOOTER */}
        <footer className="mt-6 text-white text-sm opacity-80 text-center">
          © 2026 Smart Timetable & Classroom Allocation System | Developed by Prashant and Team 🚀
        </footer>

      </div>
    </div>
  )
}

export default Login