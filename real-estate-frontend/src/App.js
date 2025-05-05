import { useState } from "react";
import axios from "axios";
import './App.css'

export default function RealEstatePredictor() {
  const [formData, setFormData] = useState({
    house_age: "",
    distance_to_mrt: "",
    num_convenience_stores: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post("https://real-estate-predictor-kb8w.onrender.com", formData, {
  //     // const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     setPrediction(response.data.prediction);
  //   } catch (err) {
  //     setError("Failed to fetch prediction. Please try again.");
  //     console.error("Error:", err);
  //   }
  //   setLoading(false);
  // };

  // const API_BASE_URL = "https://real-estate-predictor-1.onrender.com"; // Render backend URL
  const API_BASE_URL = "http://127.0.0.1:8000"; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_ACCESS_TOKEN" // Add token if required
        },
      });

      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
      console.error("Error:", err);
    }
    setLoading(false);
  };


  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Real Estate Price Predictor</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-left text-gray-700 font-semibold">Enter house age</p>
        <input
          type="number"
          name="house_age"
          placeholder="House Age"
          value={formData.house_age}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          required
        />
        <p className="text-left text-gray-700 font-semibold">Enter distance to nearest MRT station</p>
        <input
          type="number"
          name="distance_to_mrt"
          placeholder="Distance to MRT"
          value={formData.distance_to_mrt}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          required
        />
        <p className="text-left text-gray-700 font-semibold">Enter number of convenience stores</p>
        <input
          type="number"
          name="num_convenience_stores"
          placeholder="Number of Convenience Stores"
          value={formData.num_convenience_stores}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800">
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>
      {prediction && <p className="mt-4 text-green-600">Predicted Price: {prediction} $ per unit area / sq metre</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
