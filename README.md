# 🛍️ HiTeckKart — Full Stack E-commerce Web Application

A full-stack e-commerce application built with **Spring Boot (Java)** on the backend and **React + Vite** on the frontend. Supports browsing products, adding to cart, checkout, category filtering, and a dark/light theme toggle.

🔗 **Live Demo:** https://ecommerce-fullstack-app-beige.vercel.app
🔗 **Backend API:** https://ecommerce-backend-xbd6.onrender.com/api/products
🔗 **GitHub Repo:** https://github.com/Abhishek-dahale/ecommerce-fullstack-app

> ⚠️ **Note:** The backend uses an H2 in-memory database and runs on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30-50 seconds to respond while the server wakes up, and product data resets whenever the backend restarts. Add a test product via "Add Product" if the home page shows no items.

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
- Docker (containerized for deployment)

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
├── Dockerfile
└── pom.xml
```

### ⚙️ Run Locally

No external database setup needed — H2 runs in-memory and resets on restart.

```bash
cd Ecommerce-Backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**.

### ☁️ Deployment

Deployed on **Render** using a multi-stage Docker build (Maven build stage + lightweight JRE runtime stage).

### 📡 Key REST API Endpoints

| Method | Endpoint                          | Description                  |
|--------|------------------------------------|-------------------------------|
| GET    | `/api/products`                   | Fetch all products            |
| GET    | `/api/product/{id}`               | Get a single product by ID    |
| GET    | `/api/product/{id}/image`         | Fetch a product's image       |
| POST   | `/api/product`                    | Add a new product             |
| PUT    | `/api/product/{id}`                | Update an existing product    |
| DELETE | `/api/product/{id}`                | Delete a product              |

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
│   ├── axios.jsx        # Centralized API client pointing to the backend
│   ├── App.jsx
│   └── main.jsx
├── vercel.json          # SPA routing config for Vercel
├── package.json
└── vite.config.js
```

### ▶️ Run Locally

```bash
cd Ecommerce-Frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**.

### ☁️ Deployment

Deployed on **Vercel**, auto-deploying from the `main` branch on every push.

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
- 🚀 Fully deployed full-stack app (Vercel + Render), with CI/CD via GitHub — every push auto-redeploys both services

---

## 🚀 Getting Started Locally (Both Servers)

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

**Backend:** Java, Spring Boot, Spring Data JPA, H2 Database, Maven, Docker
**Frontend:** React, Vite, Axios, Bootstrap, React Router
**Deployment:** Render (backend), Vercel (frontend)
**Tools:** IntelliJ IDEA, VS Code, Git & GitHub

---

## 👤 Author

**Abhishek Dahale**
Fresher CSE Graduate | Aspiring Java Full Stack Developer
📍 Pune, India
GitHub: [@Abhishek-dahale](https://github.com/Abhishek-dahale)