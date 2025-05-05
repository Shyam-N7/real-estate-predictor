from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI()

# Get frontend URL from environment variable or use a default
# frontend_url = [os.getenv("FRONTEND_URL", "http://localhost:3000"),
#                 "https://real-estate-frontend-24p0pgezk-shyams-projects-0afec735.vercel.app"
#             ]  # Default to local for testing

# origins = [frontend_url]

# CORS Configuration to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from React  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Backend is running successfully!"}

# Load trained model
try:
    model = joblib.load("linear_regression_model.pkl")
except Exception as e:
    print(f"Error loading model: {e}")

# Define request model
class PredictionInput(BaseModel):
    house_age: float
    distance_to_mrt: float
    num_convenience_stores: int

@app.post("/predict")
def predict(data: PredictionInput):
    try:
        X = pd.DataFrame([data.dict()])
        X.columns = [
            "X2 house age",
            "X3 distance to the nearest MRT station",
            "X4 number of convenience stores"
        ]
        prediction = model.predict(X)
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    
@app.get("/health")
def health_check():
    return {"status": "ok"}
