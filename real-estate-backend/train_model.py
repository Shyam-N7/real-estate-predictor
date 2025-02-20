import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load dataset
data = pd.read_excel("UCI_Real_Estate_Valuation.xlsx")  # Ensure this file exists!
data = data.drop("No", axis=1)

# Prepare data
X = data[['X2 house age', 'X3 distance to the nearest MRT station', 'X4 number of convenience stores']]
y = data['Y house price of unit area']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Model trained successfully. MSE: {mse}")

# Save model
joblib.dump(model, "linear_regression_model.pkl")
print("Model saved as 'linear_regression_model.pkl'")
