# 📚 Smart Timetable & Classroom Allocation System

A full-stack web application that automates timetable generation for educational institutions by efficiently managing faculty, subjects, classrooms, and batches.

---

## 🚀 Overview

Timetable generation in colleges is often a manual, time-consuming, and error-prone process. 

This system provides an automated solution that:
    - Eliminates scheduling conflicts
    - Reduces manual effort
    - Improves resource utilization
    - Provides real-time timetable access

---

## 🎯 Objective

To build a scalable system that can:
- Manage academic resources (faculty, subjects, classrooms, batches)
- Generate conflict-free timetables
- Provide role-based access (Admin, Faculty, Student)

---

## 🔐 Authentication & Authorization

    ### ✅ JWT-Based Authentication
            - Secure login using JWT tokens
            - Token stored in localStorage

### 🎯 Role Detection via Email Domain

    | Domain | Role |
    |------|------|
    | `@admin.com` | Admin |
    | `@edu.in` | Faculty |
    | `@gmail.com` | Student |

    👉 System automatically redirects user based on domain

---

## 🔒 No Registration Policy (Security Design)

    ❌ No public registration

### Why?

    - Prevent unauthorized access
    - Avoid misuse by external users
    - Maintain institutional control

### ✅ Solution:
    - Admin manually creates users in DB
    - Credentials validated before login

    👉 This mimics **real industry systems (ERP / college portals)**

---


## 🧠 Approach

We use a **Constraint Satisfaction Problem (CSP)** approach:

1. Admin inputs all required data
2. System stores structured data in MongoDB
3. Scheduling engine processes constraints
4. Timetable is generated avoiding conflicts
5. Output is stored and displayed dynamically


---


## ⚙️ Tech Stack

    ### Frontend
    - React.js
    - Tailwind CSS
    - Recharts (for analytics)

    ### Backend
    - Node.js
    - Express.js

    ### Database
    - MongoDB

    ### Optimization Engine
    - Python + OR-Tools (CP-SAT Solver)


---


## 🏗️ Project file Structure

```
Smart Timetable & Classroom Allocation System
│
├── backend/
│   ├── controllers/        # Business logic for each module
│   │   ├── authController.js        # Handles login & JWT generation
│   │   ├── batchController.js       # Batch CRUD operations
│   │   ├── classroomController.js   # Classroom management
│   │   ├── facultyController.js     # Faculty management
│   │   ├── subjectController.js     # Subject management
│   │   └── timetableController.js   # Timetable generation & retrieval
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification & route protection
│   │
│   ├── models/             # MongoDB schemas
│   │   ├── User.js         # User (Admin / Faculty / Student)
│   │   ├── Faculty.js      # Faculty data
│   │   ├── Subject.js      # Subject data
│   │   ├── Classroom.js    # Classroom details
│   │   ├── Batch.js        # Student batches
│   │   └── Timetable.js    # Generated timetable
│   │
│   ├── routes/             # API endpoints
│   │   ├── authRoutes.js
│   │   ├── facultyRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── classroomRoutes.js
│   │   ├── batchRoutes.js
│   │   └── timetableRoutes.js
│   │
│   ├── server.js           # Entry point of backend (Express server)
│   └── package.json
│
├── frontend/
│   ├── public/             # Static files
│   │
│   ├── src/
│   │   ├── assets/         # Images (UI backgrounds, etc.)
│   │   │   └── login-bg.png
│   │   │
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── FacultyPanel.jsx
│   │   │   ├── SubjectPanel.jsx
│   │   │   ├── ClassroomPanel.jsx
│   │   │   ├── BatchPanel.jsx
│   │   │   ├── TimetableGrid.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/          # Main application pages
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   └── StudentDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js      # Central API communication layer
│   │   │
│   │   ├── App.js          # Routing & main layout
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind CSS config
│   │
│   └── package.json
│
├── optimizer/
│   └── scheduler.py        # Python OR-Tools optimization engine
│
├── package.json            # Root (for running both servers together)
└── README.md
```
---

## 🧩 Modules

### 👨‍💼 Admin Module (Superuser)
- Add / Delete Faculty
- Add / Delete Subjects
- Add Classrooms
- Add Batches
- Generate Timetable

👉 Admin controls entire system

---

### 👨‍🏫 Faculty Module
- View assigned timetable
- Filter by batch

---

### 👨‍🎓 Student Module
- View timetable by batch
- Simple UI access

---

## ⚡ Optimization Engine (Core Logic)

The scheduler ensures:

- No faculty overlap
- No classroom conflict
- No batch overlap
- Subject-hour requirements satisfied

The system uses OR-Tools CP-SAT solver.

### Flow:


Input Data (DB)
↓
Constraint Processing
↓
Slot Allocation
↓
Conflict Checking
↓
Final Timetable
↓
Stored in DB


### Key Constraints (from implementation) :contentReference[oaicite:1]{index=1}

### ✅ Subject Constraints
- Each subject must meet required hours/week
- Labs require fixed hours
- Theory subjects have flexible range

### ✅ No Same Subject Per Day
- A subject cannot repeat multiple times in a day

### ✅ Faculty Constraint
- A faculty cannot teach multiple classes at same time

### ✅ Classroom Constraints
- No room clash at same time
- Capacity must match batch strength
- Lab subjects only in lab rooms

### ✅ Room-Type Matching
- Lab → Lab room only
- Theory → Theory room only

### ✅ Batch Coverage
- Every subject must be assigned to at least one batch

### ✅ FREE Slot Handling
- Empty slots allowed but minimized

---

## 🎯 Optimization Objective

The system minimizes:

- Free slots (inefficiency)
- Lab mismatch (non-continuous labs)

---


## 🔄 System Flow

1. Admin logs in
2. Adds:
   - Faculty (with subjects & availability)
   - Subjects (with assigned faculty)
   - Classrooms
   - Batches
3. Clicks **Generate Timetable**
4. Backend sends data to scheduling engine
5. Engine processes constraints
6. Timetable saved in database
7. Displayed in dashboards

---

## 🏗️ Architecture Diagram

🔷 High-Level Flow
```
          ┌───────────────┐
          │   Frontend    │
          │  (React UI)   │
          └──────┬────────┘
                 │ API Calls (HTTP/REST)
                 ▼
        ┌─────────────────────┐
        │   Node.js Backend   │
        │  (Express Server)   │
        └──────┬──────────────┘
               │
   ┌───────────┼───────────────┐
   ▼           ▼               ▼
Controllers   Middleware     Routes
(Business     (JWT Auth)     (API Endpoints)
 Logic)
               │
               ▼
        ┌───────────────┐
        │   MongoDB     │
        │ (Database)    │
        └───────────────┘
               │
               ▼
        ┌────────────────────┐
        │ Python Optimizer   │
        │ (OR-Tools Engine)  │
        └────────────────────┘
```

`The system follows a layered architecture where the frontend is responsible for UI, the backend handles business logic and authentication, and the optimization logic is handled separately using Python OR-Tools. This separation ensures scalability, maintainability, and high performance.`


---

## 🔒 Dependency Rules

- ❌ Faculty cannot be deleted if assigned to subject
- ❌ Subject must have valid faculty
- ❌ Classroom must meet capacity
- ❌ Timetable must avoid overlaps

---

## 📊 Features

- Role-based dashboards
- Automated timetable generation
- Faculty load analytics
- Peak slot detection
- Background UI customization
- One-click system execution


---

## ⚖️ Load Balancing

- Faculty workload is distributed evenly
- Overloaded teachers are identified
- Peak slots are analyzed for optimization


---

## 📈 Scalability

This system is designed to scale:

- Modular backend (MVC architecture)
- REST APIs for easy integration
- Can support multiple departments
- Can extend to multi-college systems


---

## 🔮 Future Improvements

- AI-based scheduling (Genetic Algorithm)
- Continuous lab slot enforcement
- Mobile app version
- Real-time updates


---

## 🔄 End-to-End Data Flow of System
```
Admin clicks "Generate Timetable"
        ↓
Frontend sends request
        ↓
Node.js backend collects DB data
        ↓
Sends to Python optimizer
        ↓
OR-Tools generates optimized timetable
        ↓
Result sent back to backend
        ↓
Stored in MongoDB
        ↓
Returned to frontend
        ↓
Displayed in UI

```

---


## 🔄 Execution

### Run both frontend & backend

```bash
npm start 


🌐 Deployment
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas
