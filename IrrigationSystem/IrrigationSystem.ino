#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHT.h>

#define RELAY_PIN     17
#define MOISTURE_PIN  36
#define DHTPIN        15
#define DHTTYPE       DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* ssid     = "Master";
const char* password = "0501043709";

const char* mqtt_server = "aa00183f4c5e4036b2c60e6ac50e3105.s1.eu.hivemq.cloud";
const char* mqtt_user = "IrrigationSystem";
const char* mqtt_password = "IrrigationSystem1";
const int mqtt_port       = 8883;

WiFiClientSecure wifiClient;
PubSubClient client(wifiClient);

const int AirValue = 2560;
const int WaterValue = 900;
const int newMin = 314;
const int newMax = 984;
const int device_id = 1; 
String telemetry_topic = "iot/telemetry/";
String control_topic   = "iot/control/";

unsigned long lastMsg = 0;
float lastTemperature = -1;
float lastHumidity = -1;
int lastMoisture = -1;

const float temperature_threshold = 5.0; 
const float humidity_threshold = 5.0;     
const int moisture_threshold = 100;  

void setup_wifi() {
  Serial.println("Підключення до Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi підключено. IP:");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  Serial.printf("MQTT [%s]: %s\n", topic, msg.c_str());

  if (msg == "pump/on") {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("Реле: ON");
  } else if (msg == "pump/off") {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Реле: OFF");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Підключення до MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("підключено");
      client.subscribe((control_topic + device_id).c_str());
    } else {
      Serial.print("помилка, rc=");
      Serial.print(client.state());
      Serial.println(" спроба знову через 5 сек");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  dht.begin();
  setup_wifi();

  wifiClient.setInsecure();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int moisture = analogRead(MOISTURE_PIN);
    int scaledMoisture = newMax - ((moisture - WaterValue) * (newMax - newMin)) / (AirValue - WaterValue);

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Помилка зчитування DHT11");
      return;
    }
    static bool firstReadingDone = false;
    if (!firstReadingDone) {
      lastTemperature = temperature;
      lastHumidity = humidity;
      lastMoisture = scaledMoisture;
      firstReadingDone = true;
      Serial.println("Початкові значення збережено.");
      return;
    }

    bool temp_changed = abs(temperature - lastTemperature) >= temperature_threshold;
    bool humid_changed = abs(humidity - lastHumidity) >= humidity_threshold;
    bool moist_changed = abs(scaledMoisture - lastMoisture) >= moisture_threshold;

    if (temp_changed || humid_changed || moist_changed) {
      String payload = "{";
      payload += "\"device_id\":\"" + String(device_id) + "\",";
      payload += "\"temperature\":" + String(temperature) + ",";
      payload += "\"humidity\":" + String(humidity) + ",";
      payload += "\"moisture\":" + String(scaledMoisture) ;
      payload += "}";

      Serial.println("MQTT публікація (зміна понад поріг):");
      Serial.println(payload);
      client.publish((telemetry_topic + device_id).c_str(), payload.c_str());

      lastTemperature = temperature;
      lastHumidity = humidity;
      lastMoisture = scaledMoisture;
    }
  }
}
