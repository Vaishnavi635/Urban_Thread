# 🏙️ Urban Thread — Premium Fashion E-Commerce

**Urban Thread** is a high-end, full-stack e-commerce platform designed for the modern individual. Built with a focus on **minimalist aesthetics**, **visual excellence**, and **inclusive accessibility**, it provides a seamless shopping experience for premium fashion collections.

---

## ✨ Key Features

### 🛍️ Premium Shopping Experience
- **Curated Catalog**: Browse high-quality fashion pieces across Men, Women, and Accessories.
- **Dynamic Product Discovery**: Real-time search and category-based filtering.
- **Glassmorphism UI**: A sleek, modern interface with subtle animations and premium hover effects.

### 🔐 Secure Authentication
- **Full Auth Flow**: Secure Signup and Login functionality.
- **State Persistence**: User sessions managed via **JWT (JSON Web Tokens)** stored in **HTTP-only cookies** for maximum security.
- **Global Auth State**: Seamlessly integrated across the application using React Context.

### 🛒 High-Performance Cart
- **Persistent Storage**: Shopping bag items are saved to `localStorage`, ensuring data persists across refreshes.
- **Live Updates**: Real-time calculation of totals and quantities.

### 🦾 Inherent Accessibility (A11y)
- **Vision Support**: Dedicated accessibility modes for **Deuteranopia**, **Protanopia**, and **Tritanopia**.
- **High Contrast Mode**: Enhanced visibility for users with low vision.
- **Dynamic Theme**: Smooth transitions between **Luxe Dark Mode** and **Clean Light Mode**.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: Lucide React & Custom SVG Icons

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Server**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Auth**: JWT & Bcrypt

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (Running locally or a MongoDB Atlas URI)

### 2. Installation
Clone the repository and install dependencies for both the frontend and backend:

```bash
# Clone the repository
git clone <repository-url>
cd Urban_Thread

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 4. Database Seeding
Populate your database with the initial premium product collection:
```bash
cd backend
npm run seed
```

### 5. Running the Application
Start the development servers for both environments:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## 📂 Project Structure

```text
Urban_Thread/
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js Pages & Layouts
│   │   ├── components/    # Reusable UI Elements
│   │   ├── context/       # Global State (Auth, Cart, A11y)
│   │   ├── features/      # Business Logic & Modular Components
│   │   └── styles/        # CSS Constants & Tailind Overrides
├── backend/
│   ├── src/
│   │   ├── config/        # DB & Server Config
│   │   ├── controllers/   # Request Handlers (Auth, Product)
│   │   ├── models/        # Mongoose Schemas (User, Product)
│   │   ├── routes/        # API Endpoints
│   │   ├── middleware/    # Security & Error Handling
│   │   └── utils/         # Seeding & Utility Functions
```

---

## 📋 Implementation Notes
- **Security**: Authentication uses HTTP-only cookies to mitigate XSS risks.
- **Performance**: Images are optimized for fast loading and use high-quality Unsplash sources.
- **Scalability**: The modular structure allows for easy addition of new features like Reviews, Wishlists, and Order History.

---

## 👤 Author
**Anshika Rawat**  
[rawatanshiak007@gmail.com](mailto:rawatanshiak007@gmail.com)
