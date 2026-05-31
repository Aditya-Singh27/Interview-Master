# 🎙️ Interview Master

Interview Master is an AI-powered platform designed to help job seekers sharpen their interview skills. By leveraging Google's Generative AI (Gemini), the platform provides personalized interview questions, resume analysis, and detailed performance reports to ensure you're ready for your next big opportunity.

## 🚀 Features

- **AI-Driven Interview Preparation**: Get tailored technical and behavioral questions based on your background and target role.
- **Resume Analysis**: Upload your resume to receive feedback and a match score for specific job descriptions.
- **Detailed Reports**: Receive comprehensive feedback on your answers, including a preparation plan and improvement areas.
- **Real-time Feedback**: Interactive interface for conducting mock interviews.
- **Authentication System**: Secure user registration and login to track your progress.

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI library for building interactive interfaces.
- **Vite**: Ultra-fast build tool for a smooth development experience.
- **SASS/SCSS**: Advanced styling for a premium and consistent look.
- **Lucide React**: For beautiful, modern iconography.

### Backend
- **Node.js & Express**: Robust and scalable server architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database for storing user data and interview results.
- **Google Generative AI (Gemini)**: Powering the core intelligence of the platform.
- **JWT & Bcrypt**: For secure authentication and data protection.
- **Multer & Pdf-parse**: Handling file uploads and resume parsing.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB account (local or Atlas)
- Google AI (Gemini) API Key

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aditya-Singh27/Interview-Master.git
   cd Interview-Master
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend/` directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Start the development server:
     ```bash
     npm run dev
     ```

## 📂 Project Structure

- `frontend/`: React application with Vite, using a feature-based folder structure.
- `backend/`: Node.js/Express server with MVC-like architecture.
  - `src/controllers/`: Business logic for authentication and interviews.
  - `src/routes/`: API endpoint definitions.
  - `src/models/`: Database schemas.

## 📄 License

This project is licensed under the ISC License.
