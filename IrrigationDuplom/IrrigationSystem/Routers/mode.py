from fastapi import APIRouter
import app_state
from Models.mode import ModeRequest

router = APIRouter(prefix="/mode", tags=["Mode"])

@router.post("/")
async def set_mode(mode_request: ModeRequest):
    app_state.set_auto_mode(mode_request.auto_mode)
    return {"message": f"Режим змінено на {'автоматичний' if app_state.is_auto_mode else 'ручний'}"}

@router.get("/")
async def get_mode():
    return {"auto_mode": app_state.is_auto_mode}
