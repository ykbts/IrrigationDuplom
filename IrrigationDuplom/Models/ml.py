from pydantic import BaseModel

class InputData(BaseModel):
    device_id: int
    soil_moisture: float = 0.0
    temperature: float = 0.0
    air_humidity: float = 0.0

