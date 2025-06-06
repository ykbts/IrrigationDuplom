from typing import Optional

from pydantic import BaseModel

class MotorState(BaseModel):
    id: Optional[int] = None
    device_id: int
    state: bool
