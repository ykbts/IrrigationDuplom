from fastapi import APIRouter, HTTPException
from typing import List
from Models.device import DeviceIn
from Services.device_service import (
    record_device,
    get_device_by_id,
    update_device,
    delete_device,
    get_devices_by_user
)

router = APIRouter(prefix="/device", tags=["Devices"])


@router.post("/", response_model=DeviceIn)
async def save_device(data: DeviceIn):
    device = await record_device(
        user_id=data.user_id,
        device_code=data.device_code,
        device_name=data.device_name,
        device_description=data.device_description
    )
    return device


@router.get("/{device_internal_id}", response_model=DeviceIn)
async def get_device(device_internal_id: int):
    device = await get_device_by_id(device_internal_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.put("/{device_internal_id}", response_model=DeviceIn)
async def update_device_by_id(device_internal_id: int, data: DeviceIn):
    device = await update_device(
        id=device_internal_id,
        device_code=data.device_code,
        user_id=data.user_id,
        device_name=data.device_name,
        device_description=data.device_description
    )
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.delete("/{device_internal_id}")
async def delete_device_by_id(device_internal_id: int):
    deleted = await delete_device(device_internal_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Device not found")
    return {"message": "Device deleted successfully"}


@router.get("/by_user/{user_id}", response_model=List[DeviceIn])
async def get_devices_for_user(user_id: int):
    devices = await get_devices_by_user(user_id)
    if not devices:
        raise HTTPException(status_code=404, detail="No devices found for this user")
    return devices
