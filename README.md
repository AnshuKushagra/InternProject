## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Zustand (State Management)
  - Axios

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Others:**
  - Multer (for file uploads)
  - React Hot Toast (notifications)

---

# Getting Started

## 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+ recommended) → [Download Here](https://nodejs.org/)
- **MongoDB** (Local or cloud-based, e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** (for cloning the repository) → [Download Here](https://git-scm.com/)

---

## 2. Installation & Setup

### Clone the Repository

```sh
git clone https://github.com/AnshuKushagra/InternProject.git
cd InternProject
```

### Install Dependencies

#### Backend Setup
```sh
cd backend
npm install
```

#### Frontend Setup
```sh
cd ../frontend
npm install
```

---

## 3. Environment Variables

Create a `.env` file in the **backend** directory and add the following:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

For MongoDB, you can use **MongoDB Atlas** or a local database.

---

## 4. Running the Application

### Start Backend Server
```sh
cd backend
npm run dev
```
This will start the backend server on **http://localhost:5001**.

### Start Frontend Application
```sh
cd frontend
npm run dev
```
This will start the frontend on **http://localhost:5173**.
