// import React, { useState } from "react"
// import Sidebar from "./components/Sidebar"
// import AdminDashboard from "./pages/AdminDashboard"
// import FacultyDashboard from "./pages/FacultyDashboard"
// import StudentDashboard from "./pages/StudentDashboard"

// function App() {
//   const [page, setPage] = useState("admin")

//   const renderPage = () => {
//     if (page === "admin") return <AdminDashboard />
//     if (page === "faculty") return <FacultyDashboard />
//     if (page === "student") return <StudentDashboard />
//   }

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar setPage={setPage} />

//       <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
//         {renderPage()}
//       </div>
//     </div>
//   )
// }

// export default App

import React, { useState } from "react"
import Sidebar from "./components/Sidebar"
import AdminDashboard from "./pages/AdminDashboard"
import FacultyDashboard from "./pages/FacultyDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import Login from "./pages/Login"

function App() {

  // 🔥 auth + page state
  const [page, setPage] = useState("login")
  const [role, setRole] = useState(localStorage.getItem("role") || null)

  const renderPage = () => {

    // 👉 Show login first
    if (page === "login") {
      return <Login setPage={setPage} setRole={setRole} />
    }

    // 👉 Role based rendering
    if (role === "admin") return <AdminDashboard />
    if (role === "faculty") return <FacultyDashboard />
    if (role === "student") return <StudentDashboard />

    // fallback
    return <Login setPage={setPage} setRole={setRole} />
  }

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar only after login */}
      {role && page !== "login" && <Sidebar setPage={setPage} />}

      <div
        style={{
          marginLeft: role && page !== "login" ? "220px" : "0px",
          padding: "20px",
          width: "100%",
          position: "relative" // 🔥 important
        }}
      >

        {/* 🔥 GLOBAL LOGOUT BUTTON */}
        {role && page !== "login" && (
          <button
            onClick={() => {
              localStorage.removeItem("role")
              window.location.reload()
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "#ef4444",
              color: "white",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

        {renderPage()}
      </div>

    </div>
  )
}

export default App

