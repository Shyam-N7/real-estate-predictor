# real-estate-predictor
Advanced Real Estate Valuation Using Ensemble Regression Models
📌 Real Estate Price Prediction Project - Complete Setup Guide

This guide provides step-by-step instructions to set up, run, and test both the backend (FastAPI) and frontend (React) for the real estate price prediction application.

🔹 Project Overview

The application consists of:

Backend: FastAPI serving a trained machine learning model.

Frontend: React application for user interaction.

Database: CSV/Excel dataset used for model training.

✅ 1. System Requirements

Ensure you have the following installed:

Python (3.9 or later)

Node.js & npm

FastAPI, Uvicorn, and required Python packages

React and Axios for frontend

✅ 2. Clone the Repository

# Clone the project from GitHub (replace with your actual repo URL)
git clone https://github.com/Shyam-N7/real-estate-predictor.git
cd real-estate-predictor

✅ 3. Backend Setup (FastAPI)

📌 Step 1: Create & Activate Virtual Environment

python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Mac/Linux)
venv\Scripts\activate  # Activate (Windows)

📌 Step 2: Install Dependencies

pip install -r requirements.txt

📌 Step 3: Train & Save the Model

python train_model.py

This script loads the dataset, trains a linear regression model, and saves it as linear_regression_model.pkl.

📌 Step 4: Run FastAPI Server

uvicorn app:app --host 0.0.0.0 --port 8000 --reload

After running, open FastAPI docs at: 👉 http://127.0.0.1:8000/docs

✅ 4. Frontend Setup (React)

📌 Step 1: Navigate to Frontend Folder

cd frontend

📌 Step 2: Install Dependencies

npm install

📌 Step 3: Start React Development Server

npm start

The frontend should now be running at: 👉 http://localhost:3000

✅ 5. Connecting Frontend & Backend

Ensure FastAPI is running (http://127.0.0.1:8000)

Ensure React is running (http://localhost:3000)

Modify App.js API request URL if needed.

✅ 6. Testing the API

Use Postman or cURL to test:

curl -X 'POST' 'http://127.0.0.1:8000/predict' \
-H 'Content-Type: application/json' \
-d '{"house_age": 10, "distance_to_mrt": 500, "num_convenience_stores": 5}'

Expected Response:

{"prediction": [42.5]}

✅ 7. Deployment (Optional)

For deploying the project:

Backend: Use services like Render, Railway, or Heroku.

Frontend: Use Vercel or Netlify.

🎯 Final Checklist

✅ Backend running at http://127.0.0.1:8000✅ FastAPI docs available at http://127.0.0.1:8000/docs✅ Frontend running at http://localhost:3000✅ API correctly predicting house prices

🚀 Enjoy building with FastAPI & React! Let me know if you need any further improvements! 🎉
