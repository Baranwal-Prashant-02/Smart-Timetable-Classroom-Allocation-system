
import React from "react"

const Sidebar = ({ setPage }) => {

  const role = localStorage.getItem("role")

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed"
      }}
    >
      <h2>Dashboard</h2>

      {role === "admin" && (
        <button onClick={() => setPage("admin")} style={btnStyle}>
          Admin
        </button>
      )}

      {role === "faculty" && (
        <button onClick={() => setPage("faculty")} style={btnStyle}>
          Faculty
        </button>
      )}

      {role === "student" && (
        <button onClick={() => setPage("student")} style={btnStyle}>
          Student
        </button>
      )}

    </div>
  )
}

const btnStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
}

export default Sidebar