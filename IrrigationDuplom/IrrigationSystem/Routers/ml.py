from fastapi import APIRouter
from Services.ml_service import make_prediction
from Models.ml import InputData
from Mqtt.mqtt_handler import send_irrigation_command
from app_state import get_auto_mode

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
def predict_and_control(data: InputData):
    if not get_auto_mode():
        return {"error": "Auto mode is OFF. Prediction is disabled."}

    try:
        prediction = make_prediction(data)

        if isinstance(prediction, list) and len(prediction) > 0:
            prediction = prediction[0]

        action = "on" if prediction == 1 else "off"
        send_irrigation_command(action, data.device_id)

        return {"prediction": prediction}

    except Exception as e:
        print(f"[API] Помилка під час прогнозування або контролю: {e}")
        return {"error": "Не вдалося обробити запит"}
