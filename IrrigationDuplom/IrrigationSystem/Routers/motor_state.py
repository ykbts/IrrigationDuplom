from fastapi import APIRouter
from pydantic import BaseModel
from Services.motor_state_service import record_motor_data
from Models.motor_state import MotorState

router = APIRouter(prefix="/motor-data", tags=["Motor Data"])

@router.post("/", response_model=MotorState)
async def save_motor_data(data: MotorState):
    motor_data = await record_motor_data(data.device_id, data.state)
    return motor_data

