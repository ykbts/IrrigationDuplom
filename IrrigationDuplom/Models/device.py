from pydantic import BaseModel
from typing import Optional

class DeviceIn(BaseModel):
    id: Optional[int] = None
    device_code: int
    user_id: int
    device_name: str
    device_description: str
