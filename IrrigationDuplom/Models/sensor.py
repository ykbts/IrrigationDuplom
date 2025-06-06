from datetime import datetime

from pydantic import BaseModel
from typing import Optional

class SensorDataIn(BaseModel):
    id: Optional[int] = None
    device_id: int
    temperature: float
    humidity: float
    soil_moisture: float
    recorded_at: Optional[datetime] = None