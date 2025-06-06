from core.db import database
from sqlalchemy import insert
from Models.tables import motor_state
from Models.motor_state import MotorState

async def record_motor_data(device_id: int, state: bool) -> MotorState:
    query = insert(motor_state).values(
        device_id=device_id,
        state=state,
    ).returning(motor_state.c.id, motor_state.c.device_id, motor_state.c.state)

    record = await database.fetch_one(query)

    return MotorState(
        id=record["id"],
        device_id=record["device_id"],
        state=record["state"]
    )
