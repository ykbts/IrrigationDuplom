import requests

def send_to_api(endpoint, data):
    api_url = f"http://127.0.0.1:8000/{endpoint}"
    try:
        response = requests.post(api_url, json=data)
        if response.status_code == 200:
            print(f"Дані успішно надіслані в API за адресою /{endpoint}.")
        else:
            print(f"Помилка при відправці даних в API ({endpoint}): {response.status_code}")
    except Exception as e:
        print(f"Помилка при підключенні до API ({endpoint}): {e}")

def send_sensor_data(data):
    send_to_api("sensor-data", data)

def send_motor_data(data):
    send_to_api("motor-data", data)

def model_predict(data):
    send_to_api("predict", data)
