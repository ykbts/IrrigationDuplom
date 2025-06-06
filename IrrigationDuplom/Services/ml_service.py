import pandas as pd
from fastapi import HTTPException

from Utils.helpers import load_model
from Models.ml import InputData

model = load_model("Models/ML_Models/pump_model.joblib")

def make_prediction(data: InputData):
    try:
        print(f"Input data for prediction: {data}")

        if data.soil_moisture <= 0:
            raise HTTPException(status_code=400, detail="Invalid soil moisture value. Cannot be less than 0.")
        if not (-100 <= data.temperature <= 100):
            raise HTTPException(status_code=400, detail="Invalid temperature value. It should be in the range [-100, 100].")
        if not (0 <= data.air_humidity <= 100):
            raise HTTPException(status_code=400, detail="Invalid air humidity value. It should be in the range [0, 100].")

        input_df = pd.DataFrame(
            [[data.soil_moisture, data.temperature, data.air_humidity]],
            columns=['Soil Moisture', 'Temperature', 'Air Humidity']
        )

        prediction = model.predict(input_df)

        print(f"Prediction result: {prediction}")
        return int(prediction[0])

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail="Error during prediction.") from e
