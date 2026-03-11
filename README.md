# Stylish Hub - Modern E-Commerce Platform

![Stylish Hub Preview](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center)

**Stylish Hub** is a feature-rich, full-stack e-commerce web application meticulously designed to connect fashion enthusiasts with premium designers. It provides a seamless shopping experience for buyers and a robust management dashboard for sellers.

## 🚀 Key Features

### For Shoppers
* **Modern & Responsive UI**: A beautifully crafted, mobile-first interface featuring rich micro-animations, expansive product grids, and a sleek SEO-optimized layout.
* **Intelligent Global Search**: Features a 500ms debounced search bar with instant typeahead suggestions powered by backend `$regex` matching across product names and brands.
* **Shopping Cart State**: Real-time cart management powered by Redux Toolkit for tracking styles and subtotal calculations.
* **Newsletter Subscriptions**: Integrated newsletter sign-up utilizing Nodemailer to instantly welcome users via automated emails.
* **Product Discovery**: Segmented categories (Casual, Formal, Sports, Accessories) with detailed, immersive Product Detail Pages (PDP) supporting discounts and size variations.

### For Sellers & Admins
* **Role-Based Access Control**: Distinguishes between standard users and verified Sellers via secure JWT authentication.
* **Seller Dashboard**: A dedicated routing interface for sellers to monitor, Create, Update, and Delete (CRUD) their specialized inventory.
* **Form Validations**: Secure product creation flows allowing custom image URLs, dynamic pricing algorithms, and immediate catalog deployment.

## 🛠️ Technology Stack

**Frontend**
* **Framework**: React 18 (Bootstrapped with Vite)
* **State Management**: Redux Toolkit (`react-redux`)
* **Routing**: React Router DOM v6
* **Styling**: Vanilla CSS (Tailwind CSS completely phased out for custom pure CSS precision)
* **Icons**: React Icons (`react-icons/fi`, `react-icons/io5`, `react-icons/md`)

**Backend**
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Object modeling via Mongoose)
* **Authentication**: JSON Web Tokens (JWT) & bcrypt for password hashing
* **Email Services**: Nodemailer (Configured for Gmail SMTP)
* **Middleware**: `cookie-parser`, `cors`

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### Prerequisites
* Node.js installed on your machine
* MongoDB database instance (Local or Atlas)
* A Gmail App Password (for Nodemailer functionality)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/stylish-hub.git
cd stylish-hub
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd 2-actual-backend
npm install
```

Create a `.env` file in the root of `2-actual-backend` and configure your keys:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate back to the frontend directory (`src`), and install dependencies:
```bash
cd stylish-hub
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will now be running on `http://localhost:5173/` by default.

## 📁 Project Structure

```text
📦stylish-hub
 ┣ 📂2-actual-backend (Express Server)
 ┃ ┣ 📂controller     # API route logic (Item, Auth, Subscriber)
 ┃ ┣ 📂model          # Mongoose Schemas
 ┃ ┣ 📂router         # Express Route Definitions
 ┃ ┣ 📂middleware     # JWT & Role validation
 ┃ ┗ 📜app.js         # Server Entry Point
 ┃
 ┣ 📂src (React Native App)
 ┃ ┣ 📂components     # Reusable UI widgets (TopBar, Newsletter, SeoFooter, etc.)
 ┃ ┣ 📂router         # Main Page Layouts (Home, Bag, App, ItemDetail)
 ┃ ┣ 📂services       # Axios API wrapper functions
 ┃ ┣ 📂store          # Redux Slices (BagSlice, AuthSlice, ItemSlice)
 ┃ ┗ 📜main.jsx       # App Entry & Router Provider
 ┗ 📜README.md        # Project Documentation
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).