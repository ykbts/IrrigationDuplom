from fastapi import FastAPI
from contextlib import asynccontextmanager
from starlette.websockets import WebSocketDisconnect
from Models.tables import devices, motor_state
from core.db import database
from Mqtt.mqtt_listener import start_mqtt_listener
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from IrrigationSystem.Routers import auth, ml, sensor, device, motor_state, mode

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Запускається MQTT слухач")
    start_mqtt_listener()
    await database.connect()
    yield
    await database.disconnect()
    print("Сервер зупиняється")

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mode.router)
app.include_router(auth.router)
app.include_router(ml.router)
app.include_router(sensor.router)
app.include_router(motor_state.router)
app.include_router(device.router)
