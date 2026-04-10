import React, { useState } from "react"
import Sidebar from "./components/Sidebar"
import AdminDashboard from "./pages/AdminDashboard"
import FacultyDashboard from "./pages/FacultyDashboard"
import StudentDashboard from "./pages/StudentDashboard"

function App() {
  const [page, setPage] = useState("admin")

  const renderPage = () => {
    if (page === "admin") return <AdminDashboard />
    if (page === "faculty") return <FacultyDashboard />
    if (page === "student") return <StudentDashboard />
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {renderPage()}
      </div>
    </div>
  )
}

export default App