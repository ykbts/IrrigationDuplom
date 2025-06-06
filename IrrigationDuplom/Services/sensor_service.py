from typing import List
from sqlalchemy import select
from core.db import database
from sqlalchemy import insert
from Models.tables import sensor_data
from Models.sensor import SensorDataIn

async def record_sensor_data(device_id: int, temperature: float, humidity: float, soil_moisture: float) -> SensorDataIn:
    query = (
        insert(sensor_data)
        .values(
            device_id=device_id,
            temperature=temperature,
            humidity=humidity,
            soil_moisture=soil_moisture
        )
        .returning(
            sensor_data.c.id,
            sensor_data.c.device_id,
            sensor_data.c.temperature,
            sensor_data.c.humidity,
            sensor_data.c.soil_moisture,
        )
    )
    record = await database.fetch_one(query)
    return SensorDataIn(
        id=record["id"],
        device_id=record["device_id"],
        temperature=record["temperature"],
        humidity=record["humidity"],
        soil_moisture=record["soil_moisture"],

    )

async def get_sensor_data_by_device_id(device_id: int) -> List[SensorDataIn]:
    query = (
        select(
            sensor_data.c.id,
            sensor_data.c.device_id,
            sensor_data.c.temperature,
            sensor_data.c.humidity,
            sensor_data.c.soil_moisture,
            sensor_data.c.recorded_at
        )
        .where(sensor_data.c.device_id == device_id)
        .order_by(sensor_data.c.id.desc())
    )
    rows = await database.fetch_all(query)

    return [
        SensorDataIn(
            id=row["id"],
            device_id=row["device_id"],
            temperature=row["temperature"],
            humidity=row["humidity"],
            soil_moisture=row["soil_moisture"],
            recorded_at=row["recorded_at"]
        )
        for row in rows
    ]