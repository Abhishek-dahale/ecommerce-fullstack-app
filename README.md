# 🛍️ HiTeckKart — Full Stack E-commerce Web Application

A full-stack e-commerce application built with **Spring Boot (Java)** on the backend and **React + Vite** on the frontend. Supports browsing products, adding to cart, checkout, category filtering, and a dark/light theme toggle.

---

## 📁 Project Structure

```
ecommerce-fullstack-app/
├── Ecommerce-Backend/       # Spring Boot REST API backend
├── Ecommerce-Frontend/      # React + Vite frontend application
```

---

## 🧩 Backend — Spring Boot

### 🔧 Technologies Used
- Java 21
- Spring Boot
- Spring Data JPA
- **H2 in-memory database** (no external DB setup required)
- Maven

### 📂 Backend Directory Structure
```
Ecommerce-Backend/
├── controller/      # REST endpoints
├── model/           # JPA entity classes
├── repo/            # Spring Data JPA interfaces
├── service/         # Business logic
├── resources/
│   ├── application.properties
│   └── data1.sql
└── pom.xml
```

### ⚙️ Setup & Run

No external database setup needed — H2 runs in-memory and resets on restart.

```bash
cd Ecommerce-Backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**.

### 📡 Key REST API Endpoints

| Method | Endpoint                          | Description                  |
|--------|------------------------------------|-------------------------------|
| GET    | `/api/products`                   | Fetch all products            |
| GET    | `/api/product/{id}`               | Get a single product by ID    |
| GET    | `/api/product/{id}/image`         | Fetch a product's image       |
| POST   | `/api/product`                    | Add a new product             |
| PUT    | `/api/product/{id}`                | Update an existing product    |
| DELETE | `/api/product/{id}`                | Delete a product              |

*(Adjust the table above to match your exact `@RequestMapping` paths in `ProductController.java`.)*

---

## 💻 Frontend — React + Vite

### 🔧 Technologies Used
- React
- Vite
- Axios (API calls)
- Bootstrap
- React Router

### 📂 Frontend Directory Structure
```
Ecommerce-Frontend/
├── src/
│   ├── components/      # Navbar, Home, Product, Cart, AddProduct, UpdateProduct, CheckoutPopup
│   ├── Context/         # Global app state (cart, product data)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

### ▶️ Setup & Run

```bash
cd Ecommerce-Frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173** and connects to the backend at `http://localhost:8080`.

---

## 🧩 Features

- 📦 Product listing with responsive grid layout
- 🔍 Live search with dropdown results
- 🗂️ Category-based filtering
- 🛒 Add to cart, update quantity, remove items
- 💳 Checkout flow with order summary popup
- ➕ Add / update product forms with image upload
- 🌗 Dark mode / light mode toggle
- 📱 Responsive design for mobile and desktop

---

## 🚀 Getting Started (Both Servers)

1. Start the backend first (port `8080`):
   ```bash
   cd Ecommerce-Backend
   mvn spring-boot:run
   ```
2. Then start the frontend (port `5173`):
   ```bash
   cd Ecommerce-Frontend
   npm install
   npm run dev
   ```
3. Open **http://localhost:5173** in your browser.

---

## 🛠️ Tech Stack Summary

**Backend:** Java, Spring Boot, Spring Data JPA, H2 Database, Maven
**Frontend:** React, Vite, Axios, Bootstrap, React Router
**Tools:** IntelliJ IDEA, VS Code, Git & GitHub

---

## 👤 Author

**Abhishek Dahale**
Fresher CSE Graduate | Aspiring Java Full Stack Developer
📍 Pune, India
GitHub: [@Abhishek-dahale](https://github.com/Abhishek-dahale)