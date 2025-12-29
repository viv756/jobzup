
# 🚀 JobzUp – AI-Powered Job Portal

JobzUp is an AI-powered job portal designed to connect job seekers and recruiters through smart job matching, real-time communication, and modern hiring tools. The platform leverages AI to improve job discovery, recommendations, and candidate engagement.

---

## 📌 Table of Contents

- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Prerequisites](#prerequisites-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Configuration](#configuration-)
- [Project Structure](#project-structure-)
- [API Reference](#api-reference-)
- [Contributing](#contributing-)
- [Contact](#contact-)

---
## ✨ Features

- 🔍 **AI-Based Job Recommendations**  
  Intelligent matching between candidates and job postings.

- 👤 **Authentication & Authorization**  
  Secure login and registration using JWT & OAuth.

- 💼 **Job Posting & Management**  
  Recruiters can create, update, and manage job listings.

- 🧑‍💻 **Candidate Profiles**  
  Resume upload, skills, experience, and preferences.

- 💬 **Real-Time Chat**  
  Direct messaging between recruiters and job seekers.

- 📊 **Admin Dashboard**  
  Manage users, jobs, and platform activity.

- 📱 **Responsive UI**  
  Works seamlessly across desktop, tablet, and mobile.

---
## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit / Zustand
- Tailwind CSS
- ShadCN UI

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB (Mongoose)

### AI
- OpenAI API (job recommendations & AI chat)

### Real-Time
- Socket.IO

### Authentication
- JWT
- OAuth (Google / GitHub)

### Deployment
- Render / Vercel

---
## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- OpenAI API key

---

## 🚀 Installation

### Clone the repository
```
git clone https://github.com/viv756/jobzup.git
cd jobzup
```

### Install dependencies

#### Backend
```
cd backend
npm install
```
#### Frontend
```
cd frontend
npm install
```


## ⚙️ Configuration
Create a .env file in both backend and frontend directories.

### Backend .env

```
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN ="1d"
COOKIE_EXPIRE ="1"

ARCJET_ENV=development
ARCJET_KEY=your_arcjet_key

GEMINI_API_KEY=your_gemini_api_key
HF_API_TOKEN=hf_api_key

FRONTEND_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
```
### Frontend .env
```
VITE_API_BASE_URL = http://localhost:8000/api
VITE_BASE_URL = http://localhost:8000
VITE_UNSIGNED_PRESET = your_unsigned_preset_in_cloudinary
VITE_CLOUD_NAME =your_cloud_name_in_cloudinary

VITE_ZEGO_APPID=your_zegocloud_app_id
VITE_ZEGO_SERVER_SECRET=your_zegocloud_server_secret

```

---

## 💻 Usage
### Development
#### Start Backend
```
npm run dev
```
#### Start Frontend
```
npm run dev
```

---


---

## 🐳 Docker Support

JobzUp supports **Dockerized development and deployment**, making setup consistent and environment-independent.

### Prerequisites
- Docker
- Docker Compose

### Run the Project Using Docker

```bash
docker-compose up --build
```
This will start:

- Frontend (React)
- Backend (Node.js / Express)
- MongoDB

### Stop Containers
```
docker-compose down
```
```
| Service  | Description           | Port  |
| -------- | --------------------- | ----- |
| frontend | React application     | 3000  |
| backend  | Node.js / Express API | 5000  |
| mongodb  | MongoDB database      | 27017 |
```
```

---

## 2️⃣ Add Docker Files (Recommended Structure)

Your repo should look like this:

``` text
jobzup/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
├── frontend/
│   ├── Dockerfile

```
### 3️⃣ Sample docker-compose.yml
```
version: "3.9"
services:
  server:
    build: ./server
    ports:
      - "8000:8000"
    env_file:
      - ./server/.env 
  client:
    build: ./client
    ports:
      - "5173:5173"
    env_file:
      - ./client/.env  
    stdin_open: true
    tty: true
    depends_on:
      - server

```

### 4️⃣ Backend Dockerfile
```
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```
### 5️⃣ Frontend Dockerfile
```
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```
## 📁 Project Structure
```
jobzup/
├── backend/
│   ├── controllers/      # Request handlers for API endpoints
│   ├── routes/           # API route definitions
│   ├── models/           # Database models/schemas
│   ├── services/         # Business logic and external service integrations
│   ├── middleware/       # Custom middleware functions
│   └── server.js         # Backend entry point
├── frontend/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page-level components/routes
│   ├── store/           # State management (Redux/Zustand/etc.)
│   ├── hooks/           # Custom React hooks
│   └── main.jsx         # Frontend entry point
├── docs/                # Documentation files
├── .env.example         # Environment variables template
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```
---

## Contributing
1. Fork the project
2. Create your feature branch

```
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```
git commit -m "Add AmazingFeature"
```
4. Push to the branch
```
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---
## 📧 Contact

Vivek

GitHub: https://github.com/viv756

Project Live Link:
👉 https://jobzup-client.onrender.com/
