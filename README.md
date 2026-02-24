# Ecomet
this is my project in MERN

{
    "name":"test",
    "email":"test2@gmail.com",
    "password": "test@123",
    "isAdmin":true
}

{
    "name":"Ayush Kumar",
    "email":"ayushkumar@gmail.com",
    "password": "Ayush@123",
    "isAdmin":true
}

# 🛒 MERN E-Commerce Platform

A full-featured E-Commerce web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project implements secure authentication, role-based authorization (Admin & User), product management, nested categories, brand management, and a scalable RESTful API architecture.

---


---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/codeWith-Ashwani/Ecomet.git

cd Ecomet

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 2️⃣ Install Backend Dependencies
npm install



### 3️⃣ Run Development Server
npm run dev

Server runs on: http://localhost:5000



---

## 🧪 Testing

- API tested using Postman
- Database verified using MongoDB Compass
- Role-based access validated using JWT tokens

---

## 🌳 Example Category Structure
Fashion
└── Footwear
├── Sneakers
├── Sandals
└── Boots

Products are assigned to the lowest-level category for better scalability and filtering.

---

## 🚀 Features

- 🔐 JWT Authentication
- 👑 Role-Based Access Control (Admin / User)
- 🗂️ Nested Categories (Parent → Child)
- 🏷️ Brand Management
- 📦 Product Management with Images
- 📊 Stock & Ratings System
- 🛡️ Protected Routes
- 🧾 RESTful API Design
- 🗃️ MongoDB ObjectId References

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- Axios
- React Router
- Context API / Redux
- Tailwind CSS / Bootstrap

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js

### 🔹 Tools
- Postman
- MongoDB Compass
- Git & GitHub

---

## 🏗️ Backend Architecture
backend/
│
├── config/
│ └── db.js
│
├── models/
│ ├── userModel.js
│ ├── productModel.js
│ ├── categoryModel.js
│ └── brandModel.js
│
├── controllers/
│ ├── userController.js
│ ├── productController.js
│ ├── categoryController.js
│ └── brandController.js
│
├── routes/
│ ├── userRoutes.js
│ ├── productRoutes.js
│ ├── categoryRoutes.js
│ └── brandRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│ └── isAdminMiddleware.js
│
└── server.js



---

## 🗄️ Database Models

### 👤 User Model
- name
- email (unique)
- password (hashed)
- isAdmin (Boolean)
- timestamps

### 🗂️ Category Model
- name
- slug
- parentId (for nested categories)
- description
- timestamps

### 🏷️ Brand Model
- name (unique)
- description
- logo (public_id, url)
- timestamps

### 📦 Product Model
- name
- description
- price
- category (ObjectId → Category)
- brand (ObjectId → Brand)
- stock
- images (public_id, url)
- ratings
- timestamps

---

## 🔐 Authentication & Authorization

### Authentication
- JWT token generated on login
- Token required for protected routes
- Password hashed using bcrypt

### Authorization
Admin-only actions:
- Create / Update / Delete Categories
- Create / Update / Delete Brands
- Create / Update / Delete Products

Middleware Flow:
protect → isAdmin → controller



---

## 📡 API Endpoints

### 🔹 Users

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/users/register | Public |
| POST | /api/users/login | Public |
| GET | /api/users/profile | Protected |

---

### 🔹 Categories

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/categories | Admin |
| GET | /api/categories | Public |
| PUT | /api/categories/:id | Admin |
| DELETE | /api/categories/:id | Admin |

---

### 🔹 Brands

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/brands | Admin |
| GET | /api/brands | Public |
| PUT | /api/brands/:id | Admin |
| DELETE | /api/brands/:id | Admin |

---

### 🔹 Products

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/products | Admin |
| GET | /api/products | Public |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |

---

## 👨‍💻 Authors

**Ayush Kumar**  
MERN Stack Developer  

**Ashwani Singh**  
MERN Stack Developer  

---