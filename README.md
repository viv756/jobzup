
## 📌 Features

👤 User Roles

- Job Seekers
- Recruiters
🧩 Core Functionality

- User authentication and authorization (JWT-based)
- Role-based dashboards for job seekers and recruiters
- Job posting, editing, and management
- Job application and applicant tracking
- Advanced job search and filtering
- AI-powered job–profile matching
- Real-time chat between recruiters and candidates
- In-app video interview support
- Secure data access and permissions
- Fully responsive UI (desktop & mobile)

🤖 AI-Powered Job Matching

- Uses embedding-based similarity scoring to match candidate profiles with relevant job listings
- skills, experience, and job requirements
- Provides personalized job recommendations with high relevance

🛠️ Tech Stack

Frontend

- React (TypeScript)
- Tailwind CSS
- Redux

Backend

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- Bcrypt

Socket.io (real-time chat)

AI

- Gemini for job–profile similarity matching

DevOps / Deployment

- Docker
- Docker Compose
- Cloud deployment (Render / Vercel)


## Installation

# Clone the repository
git clone https://github.com/your-username/job-portal.git

# Navigate into the project
cd job-portal

# Create environment variables
cp .env.example .env

# Start all services
docker-compose up --build

