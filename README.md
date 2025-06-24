# Workout Generator AI

A modern web application that generates personalized workout routines using Google's Gemini AI. Users can input their preferences and receive tailored workout plans with interactive features like liking workouts to track popularity.

## 🚀 Features

- **AI-Powered Workouts**: Generate custom workout routines using Google's Gemini AI
- **Interactive UI**: Clean, responsive interface built with DaisyUI and Tailwind CSS
- **Workout Management**: View detailed workout information and track popularity
- **Safe Input Validation**: Robust input validation to ensure secure prompt processing
- **Real-time Updates**: Seamless data fetching and caching with TanStack Query

## 🛠️ Tech Stack

### [Bun.sh](https://bun.sh/) javascript runtime

### Frontend

- **Vite** - Fast build tool and development server
- **Preact** - Lightweight React alternative
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind

### Backend

- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Google AI (Gemini)** - AI-powered workout generation
- **Validator** - Input sanitization and validation

## 📁 Project Structure

```
workout-generator-ai/
├── frontend/          # Vite + Preact application
├── backend/           # Express.js API server
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Bun.sh javascript runtime (1.12.\* or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google AI API key (for Gemini)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Vegard-hd/workout-generator-ai.git
   cd workout-generator-ai
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   bun install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../backend
   bun install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   MONGO_CONN_STRING=mongodb://localhost:27017/workout-generator
   GEMINI_KEY=your_gemini_api_key_here
   PORT=3008

   ```

5. **Start the development servers**

   Backend (from backend directory):

   ```bash
   bun run dev
   ```

   Frontend (from frontend directory):

   ```bash
   bun run dev
   ```

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter your workout preferences (goals, duration, equipment, etc.)
3. Click "Generate Workout" to receive an AI-powered routine
4. View detailed workout information and like workouts you enjoy
5. Browse previously generated workouts

## 🔧 API Endpoints

- `POST http://localhost:3008/api/workouts` - Generate a new workout
- `GET http://localhost:3008/api/workouts/:id` - Get workout details
- `POST http://localhost:3008/api/workouts/:id/like` - Increment workout likes
- `POST http://localhost:3008/api/workouts/:id/unlike` - Decrement workout likes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI team for the Gemini API
- The open-source community for the amazing tools and libraries
- All contributors who help improve this project

## 📞 Contact

**Vegard-hd** - [GitHub Profile](https://github.com/Vegard-hd)

Project Link: [https://github.com/Vegard-hd/workout-generator-ai](https://github.com/Vegard-hd/workout-generator-ai)

---

#### _Built with ❤️ and powered by AI_

#### _Readme generated with Claude Sonnet 4_
