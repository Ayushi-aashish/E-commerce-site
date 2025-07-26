# 🛒 MERN Ecommerce Project

This is a **full-stack ecommerce application** built with the **MERN stack** (MongoDB, Express, React, Node.js). It features complete authentication, product management, cart functionality, and admin operations.


## 🚀 Features

### 🧑‍💻 User Features
- Register & login with JWT authentication
- Browse products with pagination and search
- Add products to cart and checkout
- View order history and profile details
- Responsive UI built with React-Bootstrap

### 🛠️ Admin Features
- Full product CRUD (create, update, delete)
- Manage users (view, edit, delete)
- Manage orders (mark as delivered/paid)
- Upload product images

---

## 🧱 Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Frontend      | React, React Router, Redux Toolkit |
| Backend       | Node.js, Express                  |
| Database      | MongoDB, Mongoose                 |
| Auth          | JSON Web Token (JWT), bcryptjs    |
| Styling       | React-Bootstrap, CSS              |
| File Uploads  | Multer, Cloudinary (or local)     |
| Payment       | PayPal / Stripe integration       |
| Dev Tools     | ESLint, Prettier, concurrently    |

---

## 📂 Folder Structure

root/
├── backend/ # Express backend
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth and error handling
│ └── server.js # App entry point
├── frontend/ # React frontend
│ ├── components/ # Reusable UI
│ ├── screens/ # Page-level components
│ └── App.js # Main React component
├── .env # Environment variables
├── package.json # Root project config

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 📦 Prerequisites

- Node.js ≥ 18
- MongoDB installed and running
- PayPal or Stripe developer account (optional for payment)

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce

# Install backend dependencies
cd backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env file with MongoDB URI, JWT_SECRET, PayPal/Stripe keys

# Run backend
npm run dev
bash
Copy
Edit
# Install frontend dependencies
cd ../frontend
npm install

# Run frontend
npm start

💻 Scripts
Command	Description
npm run dev (backend)	Run server with nodemon
npm start (frontend)	Start React app
npm run build	Build React frontend for production
npm run data:import	Import sample data (products/users)

🛡️ Security
Passwords hashed using bcryptjs

Secure JWT-based authentication with HTTP-only cookies

Environment variables managed via .env

🌐 Deployment
You can deploy this project to:

Heroku

Render

Vercel (frontend only)

Netlify + Railway (hybrid option)

For deployment, make sure to run npm run build in the frontend and serve the static files from Express.

📸 Screenshots
Add some screenshots here of the product list, cart, checkout, admin dashboard, etc.

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgments
MongoDB, Express, React, Node.js

