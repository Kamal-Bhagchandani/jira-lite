# 🚀 Jira Lite

A lightweight Jira-inspired project management application built with the **MERN Stack**. It helps teams create projects, collaborate with members, assign tasks, and track progress using a clean Kanban board.

Designed to provide the core functionality of enterprise project management tools while keeping the interface simple, intuitive, and easy to use.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Guest Routes
- Form Validation using React Hook Form + Zod

### 📁 Project Management
- Create Projects
- View Projects
- Delete Projects
- Add Project Members
- Role-based Authorization

### ✅ Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Assign Tasks to Project Members
- Update Task Status
- Set Task Priority
- Set Due Date

### 📌 Kanban Board
- Todo
- In Progress
- Done

### 🛡 Authorization
Different permissions based on user roles.

- **Project Owner**
  - Full project access
  - Manage members
  - Edit/Delete tasks

- **Task Creator**
  - Edit task details

- **Task Assignee**
  - Update task status

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

# 📂 Project Structure

```
jira-lite/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

> Screenshots will be added after deployment.

- Login Page
- Dashboard
- Kanban Board
- Task Details Modal
- Add Members
- Project Settings *(Coming Soon)*

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Kamal-Bhagchandani/jira-lite.git
```

---

## Backend

```bash
cd backend

npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install
```

Create a `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

---

# 🔑 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

---

## Projects

```
GET     /api/projects
GET     /api/projects/:id

POST    /api/projects

PATCH   /api/projects/:id
PATCH   /api/projects/:id/members

DELETE  /api/projects/:id
```

---

## Tasks

```
GET     /api/tasks/project/:projectId

POST    /api/tasks

PATCH   /api/tasks/:id

DELETE  /api/tasks/:id
```

---

# 🚧 Upcoming Features

- Project Settings
- Drag & Drop Kanban
- Task Comments
- Activity History
- Search & Filters
- Notifications
- Rate Limiting
- Cookie-based Authentication

---

# 🎯 Why Jira Lite?

The goal of Jira Lite isn't to replace Jira.

It was built to:

- Learn how real-world collaborative applications are designed.
- Implement secure authentication and authorization.
- Understand REST API design.
- Practice scalable MERN architecture.
- Build a lightweight project management tool for small teams and student projects.

---

# 👨‍💻 Author

**Kamal Bhagchandani**

GitHub: https://github.com/Kamal-Bhagchandani

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!