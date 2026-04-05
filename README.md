# 💰 Finance Dashboard Backend API

A backend system for managing personal finances with role-based access control.  
Built using Node.js, Express, TypeScript, and MongoDB.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🧑‍💼 Role-Based Access (Admin, Analyst, Viewer)
- 👤 User Management (Admin Only)
- 💰 Financial Records (Income & Expense)
- 📊 Dashboard Analytics
- 🔍 Filtering (date, category, type)
- 🛡️ Secure APIs with Middleware

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication

---

## 📁 Folder Structure

src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── index.ts


---

## ⚙️ Setup Instructions

### 1. Clone Repository
git clone https://github.com/your-username/finance-backend.git
cd finance-backend

### 2. Install Dependencies
npm install

### 3. Create `.env` file
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

### 4. Run Project
npm run dev


---

## 🔐 Roles & Permissions

| Role     | Permissions |
|----------|------------|
| Admin    | Full access |
| Analyst  | Create & view records |
| Viewer   | View only |

---

## 📡 API Endpoints

### 🔹 Auth
- POST `/auth/register`
- POST `/auth/login`

### 🔹 Users (Admin)
- GET `/auth/users`
- PATCH `/auth/users/:id/status`

### 🔹 Records
- POST `/records`
- GET `/records`
- PUT `/records/:id`
- DELETE `/records/:id`

### 🔹 Dashboard
- GET `/dashboard`

---

## 🧪 API Testing

Postman Collection included in submission.

---

## 👨‍💻 Author

Shubham Shinare