import React, { useState } from "react"

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

    // 🔥 validation first
    if (!validate()) return

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Login Successful ✅")

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)

      setRole(data.role)
      setPage(data.role)

    } else {
      setError(data.error || "Invalid credentials")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter User_id"
          className={`w-full p-2 border mb-2 ${
            error ? "border-red-500" : ""
          }`}
          onChange={e => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password (min 6 chars)"
          className={`w-full p-2 border mb-2 ${
            error ? "border-red-500" : ""
          }`}
          onChange={e => setPassword(e.target.value)}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  )
}

export default Login