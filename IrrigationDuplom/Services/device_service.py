from typing import List, Optional
from sqlalchemy import update, delete, insert, select
from Models.tables import devices
from datetime import datetime
from core.db import database
from Models.device import DeviceIn

async def record_device(user_id: int, device_code: int, device_name: str, device_description: str) -> Optional[DeviceIn]:
    query = insert(devices).values(
        user_id=user_id,
        device_code=device_code,
        device_name=device_name,
        device_description=device_description,
        created_at=datetime.utcnow()
    )
    last_record_id = await database.execute(query)

    query_select = select(devices).where(devices.c.id == last_record_id)
    result = await database.fetch_one(query_select)
    if result:
        return DeviceIn(
            id=result["id"],
            device_code=result["device_code"],
            user_id=result["user_id"],
            device_name=result["device_name"],
            device_description=result["device_description"],
        )
    return None


async def get_device_by_id(id: int) -> Optional[DeviceIn]:
    query = select(devices).where(devices.c.id == id)
    result = await database.fetch_one(query)
    if result:
        return DeviceIn(
            id=result["id"],
            device_code=result["device_code"],
            user_id=result["user_id"],
            device_name=result["device_name"],
            device_description=result["device_description"],
        )
    return None


async def get_devices_by_user(user_id: int) -> List[DeviceIn]:
    query = select(devices).where(devices.c.user_id == user_id)
    results = await database.fetch_all(query)
    return [
        DeviceIn(
            id=row["id"],
            device_code=row["device_code"],
            user_id=row["user_id"],
            device_name=row["device_name"],
            device_description=row["device_description"],
        )
        for row in results
    ]


async def update_device(id: int, device_code: int, user_id: int, device_name: str, device_description: str) -> Optional[DeviceIn]:
    query = update(devices).where(devices.c.id == id).values(
        device_code=device_code,
        user_id=user_id,
        device_name=device_name,
        device_description=device_description,
        # без updated_at
    )
    await database.execute(query)
    return await get_device_by_id(id)


async def delete_device(id: int) -> bool:
    query = delete(devices).where(devices.c.id == id)
    result = await database.execute(query)
    return bool(result)
