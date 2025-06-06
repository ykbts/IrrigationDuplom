import os
import json
from http.client import HTTPException
import app_state
from Mqtt.mqtt_message_handler import send_sensor_data, send_motor_data, model_predict
import json
import traceback
from Models.ml import InputData
from Models.motor_state import MotorState
from Models.sensor import SensorDataIn
from Mqtt.mqtt_client import MQTTClient

def on_mqtt_message(client, userdata, msg):
    topic = msg.topic
    if topic.startswith("iot/telemetry/"):
        on_telemetry_message(msg)
    elif topic.startswith("iot/control/"):
        on_control_message(msg)

def on_control_message(msg):
    try:
        payload = msg.payload.decode()
        print(f"[MQTT] Отримано керування: {payload}")

        if payload not in ["pump/on", "pump/off"]:
            print("[MQTT] Невідомий формат керування")
            return

        action = payload.split("/")[1]  # "on" або "off"
        motor_state = 1 if action == "on" else 0

        topic_parts = msg.topic.split("/")
        device_id = int(topic_parts[-1])

        motor_data = MotorState(device_id=device_id, state=bool(motor_state))
        send_motor_data(motor_data.dict())
        print(f"[MQTT] Статус мотора збережено: {action} для пристрою {device_id}")

    except Exception as e:
        print(f"[MQTT] Помилка обробки control: {e}")
        traceback.print_exc()

def send_irrigation_command(action: str, device_id: int):
    if action not in ["on", "off"]:
        raise HTTPException(status_code=400, detail="Invalid action. Use 'on' or 'off'.")

    mqtt_client = MQTTClient()
    control_topic = f"iot/control/{device_id}"
    telemetry_topic = f"iot/telemetry/{device_id}"

    mqtt_client.send_command(control_topic, f"pump/{action}")
    mqtt_client.subscribe_response_topic(telemetry_topic)
    mqtt_client.disconnect()


def parse_telemetry_message(msg):
    try:
        payload = msg.payload.decode()
        data = json.loads(payload)
        print(f"[MQTT] Отримано телеметрію: {data}")
        return data
    except Exception as e:
        print(f"[MQTT] Помилка при декодуванні або JSON: {e}")
        traceback.print_exc()
        return None

def predict_irrigation(data):
    try:
        input_data = InputData(
            device_id=int(data.get("device_id", 0)),
            soil_moisture=float(data["moisture"]),
            temperature=float(data["temperature"]),
            air_humidity=float(data["humidity"])
        )
        prediction = model_predict(input_data.dict())
        return prediction, input_data.device_id
    except Exception as e:
        print(f"[ML] Помилка у прогнозуванні: {e}")
        traceback.print_exc()
        return None, None


def process_sensor_data(data):
    try:
        device_id = int(data.get("device_id", 0))
        sensor_data = SensorDataIn(
            sensor=device_id,
            device_id=device_id,
            temperature=float(data["temperature"]),
            humidity=float(data["humidity"]),
            soil_moisture=float(data["moisture"])
        )
        send_sensor_data(sensor_data.dict())
    except Exception as e:
        print(f"[API] Помилка при обробці даних для сенсора чи мотора: {e}")
        traceback.print_exc()


def on_telemetry_message(msg):
    data = parse_telemetry_message(msg)
    if not data:
        return

    process_sensor_data(data)

    if not app_state.get_auto_mode():
        print("[MQTT] Ручний режим, модель не керує поливом.")
        return

    prediction, device_id = predict_irrigation(data)
    if prediction is None:
        return

    try:
        action = "on" if prediction == 1 else "off"
        send_irrigation_command(action, device_id)
    except Exception as e:
        print(f"[MQTT] Помилка обробки: {e}")
        traceback.print_exc()



