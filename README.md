# AI HR Assistant

A full-stack AI-powered HR assistant with a React frontend and Python FastAPI backend. This application helps employees with HR policies and claim submissions through an intelligent chat interface.

## Project Structure

```
├── frontend/               # React frontend application
│   ├── src/                # React source files
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API clients and business logic
│   │   ├── context/        # React context providers
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── .env               # Environment variables
│   └── package-lock.json   # Lock file
└── backend/                # Python FastAPI backend
    ├── api/                # API routes
    ├── core/               # Core logic
    ├── main.py             # Application entry point
    └── requirements.txt    # Python dependencies
```

## Features

- **AI-Powered Chatbot**: Intelligently handles HR policy questions and claim submissions
- **Secure Authentication**: OTP-based login system
- **Modern UI**: Built with React and Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Quick Start (Recommended)

Run both frontend and backend simultaneously:

```bash
# Install all dependencies
npm run install:all

# Start both servers
npm run dev
```

This will start:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Manual Setup

#### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5173` in your browser

#### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart
   ```

3. Start the backend server:
   ```bash
   python -m uvicorn main:app --reload --port 3000
   ```

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Available Scripts

### Root Directory Scripts
- `npm run dev` - Start both frontend and backend servers
- `npm run dev:frontend` - Start only frontend server
- `npm run dev:backend` - Start only backend server
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run install:frontend` - Install frontend dependencies
- `npm run install:backend` - Install backend dependencies

### Frontend Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## API Integration

The frontend communicates with the backend through the following endpoints:

- **Chat Endpoint**: `POST /chat` - Handles HR policy questions and claim submissions
- **Health Check**: `GET /health` - Backend health status

The frontend expects the backend to run on `http://localhost:3000` and uses CORS to allow cross-origin requests.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request