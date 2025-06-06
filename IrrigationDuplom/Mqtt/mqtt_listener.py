import threading
from Mqtt.mqtt_client import MQTTClient
from Mqtt.mqtt_handler import on_mqtt_message

def start_mqtt_listener():
    def run():
        mqtt_client = MQTTClient()
        mqtt_client.client.on_message = on_mqtt_message

        mqtt_client.client.subscribe("iot/telemetry/+")
        mqtt_client.client.subscribe("iot/control/+")

        mqtt_client.client.loop_forever()

    thread = threading.Thread(target=run)
    thread.daemon = True
    thread.start()
