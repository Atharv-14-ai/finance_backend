# Finance Data Processing & Access Control Backend

A backend system designed for managing financial records with **Role-Based Access Control (RBAC)**, built to simulate a real-world finance dashboard backend.

---

# Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **JWT Authentication**
* **Postman (API Documentation)**

---

# Features

✅ User Authentication (JWT)
✅ Role-Based Access Control (ADMIN / ANALYST / VIEWER)
✅ Financial Records CRUD
✅ Advanced Filtering (date, category, type)
✅ Dashboard Analytics APIs
✅ Input Validation & Error Handling
✅ PostgreSQL Data Persistence

---

# System Design Overview

The system follows a **layered architecture**:

* **Routes** → API endpoints
* **Controllers** → Request handling
* **Services** → Business logic
* **Prisma** → Database interaction

---

# Role-Based Access Control

| Role    | Permissions              |
| ------- | ------------------------ |
| ADMIN   | Full access              |
| ANALYST | View records + dashboard |
| VIEWER  | Limited access           |

---

# Role Assignment Logic

* All users register as **VIEWER**
* Only ADMIN can update roles
* Prevents unauthorized privilege escalation

---


Database Setup (PostgreSQL)
Step 1: Create Database

Run this in PostgreSQL:
CREATE DATABASE finance_backend;

Step 2: Connect via .env
DATABASE_URL=postgresql://user:password@localhost:5432/finance_backend

Step 3: Sync Schema
npx prisma db pull
npx prisma generate

Database tables are managed using Prisma ORM schema. Direct SQL table creation is not required.

# Initial Admin Setup (VERY IMPORTANT)

Since no ADMIN exists initially, you must bootstrap one.

---

## Step 1: Register User

```bash
POST /auth/register
```

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

## Step 2: Promote to ADMIN (PostgreSQL)

Run this SQL query:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@test.com';
```

---

## Alternative: Prisma Studio

```bash
npx prisma studio
```

* Open `users` table
* Change role → `ADMIN`

---

# Setup Instructions

---

## 1. Clone Repository

```bash
git clone https://github.com/Atharv-14-ai/finance_backend.git
cd finance_backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/finance_backend
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Setup Database

```bash
npx prisma db pull
npx prisma generate
```

---

## 5. Run Server

```bash
npm run dev
```

---

## Server runs at:

```bash
http://localhost:5000
```

---

# API Documentation (Postman)

Use this link to explore and test APIs:

```text
https://documenter.getpostman.com/view/50091050/2sBXiqDTVr
```

---

## How to Use APIs (Step-by-Step)

---

### 1. Register User

```http
POST /auth/register
```

---

### 2. Promote to ADMIN (SQL)

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@test.com';
```

---

### 3. Login

```http
POST /auth/login
```

Response:

```json
{
  "token": "your_jwt_token"
}
```

---

### 4. Set Token in Postman

In Postman:

```
Authorization → Bearer Token → paste token
```

OR set collection variable:

```
token = your_jwt_token
```

---

### 5. Use APIs

Now you can:

* Create records (ADMIN)
* View records (ADMIN / ANALYST)
* Access dashboard (ANALYST)
* Manage users (ADMIN)

---

# API Overview

---

## Auth

* POST `/auth/register`
* POST `/auth/login`

---

## Users (ADMIN)

* GET `/users`
* PATCH `/users/:id/role`
* PATCH `/users/:id/status`

---

## Records

* POST `/records`
* GET `/records`
* PATCH `/records/:id`
* DELETE `/records/:id`

---

## Dashboard

* GET `/dashboard/summary`
* GET `/dashboard/categories`
* GET `/dashboard/trends`
* GET `/dashboard/recent`

---

# Filtering Support

```http
GET /records?page=1&limit=10&type=INCOME&category=Food
```

---

# Validation & Error Handling

The system validates:

* Email format
* Password length
* Required fields
* Enum values (type, role)

---

## Example Error

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

# Date Handling

* Input format: `YYYY-MM-DD`
* Internally stored as ISO DateTime

---

# Database Design

### Users Table

* id
* email
* password
* role
* is_active
* created_at

---

### Records Table

* id
* amount
* type
* category
* date
* notes
* user_id

---

# Technical Decisions & Trade-offs

---

### Why Prisma?

* Type-safe queries
* Faster development
* Easy integration with PostgreSQL

---

### Why RBAC?

* Secure access control
* Real-world system design
* Prevents misuse of APIs

---

### Why Default Role = VIEWER?

* Prevents privilege escalation
* Forces controlled role assignment

---

### Trade-offs

* No refresh tokens (simplified auth)
* No soft deletes (kept minimal)
* No rate limiting (not required for assignment)

---

# Assumptions

* Users are manually promoted to ADMIN initially
* Dates are always valid format
* System is single-tenant (no multi-org support)

---

# Future Improvements

* Swagger API documentation
* Refresh token authentication
* Soft delete for records
* Role hierarchy system
* Rate limiting
* Unit & integration tests

---

# Summary

This project demonstrates:

* Clean backend architecture
* Secure RBAC implementation
* Financial data processing
* Aggregated dashboard APIs
* Real-world backend design thinking

---

# Author

**Atharv Patil**

---

# Final Note

This project focuses on **clarity, correctness, and backend engineering principles** rather than unnecessary complexity.

---
