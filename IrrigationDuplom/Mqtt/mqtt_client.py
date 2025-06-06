import os
from dotenv import load_dotenv
import paho.mqtt.client as mqtt

load_dotenv()

class MQTTClient:
    def __init__(self):
        username = os.getenv("MQTT_USERNAME")
        password = os.getenv("MQTT_PASSWORD")
        host = os.getenv("MQTT_BROKER_HOST")
        port = int(os.getenv("MQTT_PORT", 8883))

        self.client = mqtt.Client()

        if username and password:
            self.client.username_pw_set(username, password)

        self.client.tls_set()

        try:
            self.client.connect(host, port)
            print("MQTT: Підключення успішне")
        except Exception as e:
            print(f"Помилка з'єднання з MQTT брокером: {e}")

    def send_command(self, topic: str, message: str):
        self.client.publish(topic, message)
        self.client.loop()

    def subscribe_response_topic(self, topic: str):
        def on_message(client, userdata, msg):
            print(f"Отримано телеметрію: {msg.topic} -> {msg.payload.decode()}")
        self.client.on_message = on_message
        self.client.subscribe(topic)
        self.client.loop_start()

    def disconnect(self):
        self.client.loop_stop()
        self.client.disconnect()
        print("MQTT: Відключено")

