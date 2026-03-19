<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CreatorNexus Dashboard

A full-stack creator dashboard with authentication, session management, and MongoDB integration.

## Features

- 🔐 User authentication (login/register)
- 💳 Razorpay payment integration for registration
- ⏱️ 2-hour session management
- 🗄️ MongoDB database integration
- 🎨 Modern React + TypeScript frontend
- 🚀 FastAPI Python backend
- 📊 Dashboard analytics and tools
- 🏠 Professional landing page

## Quick Start

### Prerequisites
- Node.js
- Python 3.8+
- MongoDB

### Option 1: Automated Start (Windows)

```bash
start.bat
```

### Option 2: Manual Start

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
npm install
npm run dev
```

## Setup Guide

For detailed setup instructions, see [SETUP_AUTH.md](SETUP_AUTH.md)

## Configuration

1. Set `MONGO_URI` and `SECRET_KEY` in `backend/.env`
2. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env` (see [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md))
3. Set `GEMINI_API_KEY` in `.env.local` (optional, for AI features)

## Registration Fees

- **Lessee, Mineral Dealers, Others**: ₹5,000
- **Firms/Company**: ₹10,000
- **Students, Researchers**: ₹1,000

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

View your app in AI Studio: https://ai.studio/apps/drive/1HaKzsXPCFVpUZMhuLVXDxF2nUV0ev77v
