# Telecaller Dashboard - Backend

Backend API for the Telecaller Dashboard built using **Node.js**, **Express.js**, and **MongoDB**.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Faker (for seeding sample data)

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/telecaller-dashboard
```

If using MongoDB Atlas

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/telecaller-dashboard
```

---

# Run Backend

Development Mode

```bash
npm run dev
```

Production

```bash
npm start
```

Server will start on

```
http://localhost:3000
```

---

# Seed Database

The project contains a seed script.

It will create

- 2 Telecallers
- 10,000 Orders

Run

```bash
npm run seed
```

# Scripts

Install Packages

```bash
npm install
```

Run Development Server

```bash
npm run dev
```
xw

Seed Database

```bash
npm run seed
```