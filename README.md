# AI Chatbot

A modern chatbot application built with React frontend and FastAPI backend, powered by Groq's LLaMA model.

## Features

- Real-time chat interface
- Conversation history
- Modern gradient UI design
- RESTful API backend
- Conversation session management

## Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- Modern CSS with gradients

**Backend:**
- FastAPI
- Groq API (LLaMA 3.1-8b-instant)
- Python 3.8+

## Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Groq API key

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Arnab-1869/chatbot-project.git
cd chatbot-project

2. Backend Setup
bash# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env and add your Groq API key
# GROQ_API_KEY=your_actual_api_key_here
3. Frontend Setup
bash# Install Node.js dependencies
npm install