// import React from "react"

// const Sidebar = ({ setPage }) => {
//   return (
//     <div style={{
//       width: "200px",
//       height: "100vh",
//       background: "#222",
//       color: "white",
//       padding: "20px"
//     }}>
//       <h3>Dashboard</h3>

//       <button onClick={() => setPage("admin")}>Admin</button><br/><br/>
//       <button onClick={() => setPage("faculty")}>Faculty</button><br/><br/>
//       <button onClick={() => setPage("student")}>Student</button>
//     </div>
//   )
// }

// export default Sidebar

import React from "react"

const Sidebar = ({ setPage }) => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Dashboard</h3>

      <div style={styles.nav}>
        <button style={styles.btn} onClick={() => setPage("admin")}>
          Admin
        </button>

        <button style={styles.btn} onClick={() => setPage("faculty")}>
          Faculty
        </button>

        <button style={styles.btn} onClick={() => setPage("student")}>
          Student
        </button>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",           // full screen height
    background: "#1e293b",     // modern dark color
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",         // FIX: prevents breaking in middle
    top: 0,
    left: 0
  },

  title: {
    marginBottom: "30px"
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  btn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    width: "100%",
  }
}

export default Sidebar