# Employee Management System

## 📌 Overview

This is a **RESTful API** built with **Node.js, Express.js, and MySQL** for managing employees and departments.  
It includes CRUD operations, paging, duplicate contact validation, phone encryption, and useful statistics.

---

## ⚙️ Tech Stack

-   **Backend:** Node.js (Express.js)
-   **Database:** MySQL
-   **Database Driver:** mysql2
-   **Validation:** Joi (or express-validator)
-   **Encryption:** bcrypt
-   **API Docs:** Swagger UI

---

## 🗂️ Database Schema

### Employee Table

| Column        | Type      | Description                |
| ------------- | --------- | -------------------------- |
| id            | INT (PK)  | Auto Increment Employee ID |
| department_id | INT (FK)  | Linked to Department table |
| name          | VARCHAR   | Employee Name              |
| dob           | DATE      | Date of Birth              |
| phone         | VARCHAR   | Encrypted phone number     |
| photo         | VARCHAR   | Photo URL / Path           |
| email         | VARCHAR   | Unique Email ID            |
| salary        | DECIMAL   | Employee Salary            |
| status        | TINYINT   | Active / Inactive          |
| created       | TIMESTAMP | Created At                 |
| modified      | TIMESTAMP | Modified At                |

### Department Table

| Column   | Type      | Description       |
| -------- | --------- | ----------------- |
| id       | INT (PK)  | Department ID     |
| name     | VARCHAR   | Department Name   |
| status   | TINYINT   | Active / Inactive |
| created  | TIMESTAMP | Created At        |
| modified | TIMESTAMP | Modified At       |

---

## 🚀 Features

1. **Employee APIs**

    - List employees with pagination
    - Add/Edit/Delete employees
    - Prevent duplicate email/phone entries
    - Phone numbers stored in encrypted format

2. **Department APIs**

    - CRUD operations on departments

3. **Statistics APIs**
    - Department-wise highest salary
    - Salary range wise employee count (done in a single query)
    - Youngest employee (name + age) per department

---

## 📥 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/employee-management.git
cd employee-management
```
