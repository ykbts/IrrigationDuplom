from datetime import datetime, timedelta
from http.client import HTTPException
from idlelib.query import Query
from typing import List
from fastapi import Query
from typing import Optional
from fastapi import APIRouter, Depends
from Services.sensor_service import get_sensor_data_by_device_id
from Services.sensor_service import record_sensor_data
from Models.sensor import SensorDataIn

router = APIRouter(prefix="/sensor-data", tags=["Sensor Data"])

@router.get("/{device_id}", response_model=List[SensorDataIn])
async def get_sensor_data(device_id: int, range: Optional[str] = Query(default="30d")):
    all_data = await get_sensor_data_by_device_id(device_id)

    if not all_data:
        raise HTTPException(status_code=404, detail="No data found for this device_id")

    now = datetime.utcnow()

    if range == "24h":
        start_time = now - timedelta(hours=24)
    elif range == "7d":
        start_time = now - timedelta(days=7)
    elif range == "30d":
        start_time = now - timedelta(days=30)
    else:
        raise HTTPException(status_code=400, detail="Invalid range parameter")

    filtered_data = []
    for item in all_data:
        recorded_at_value = item.recorded_at
        if isinstance(recorded_at_value, str):
            recorded_at_dt = datetime.fromisoformat(recorded_at_value)
        else:
            recorded_at_dt = recorded_at_value

        if recorded_at_dt >= start_time:
            filtered_data.append(item)

    if not filtered_data:
        raise HTTPException(status_code=404, detail="No data found in the specified range")

    return filtered_data

@router.post("/", response_model=SensorDataIn)
async def save_sensor_data(data: SensorDataIn):
    saved_data = await record_sensor_data(data.device_id, data.temperature, data.humidity, data.soil_moisture)
    return saved_data
