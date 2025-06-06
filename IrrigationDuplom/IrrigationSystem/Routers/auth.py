from fastapi import APIRouter, HTTPException
from Models.auth import RegisterRequest, LoginRequest
from Services.auth_service import register_user, login_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(request: RegisterRequest):
    try:
        user_id = await register_user(request.username, request.email, request.password)
        return {"message": "Користувач успішно зареєстрований", "user_id": user_id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(request: LoginRequest):
    user_id = await login_user(request.username, request.password)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Невірний email або пароль")
    return {"message": "Успішний вхід", "user_id": user_id}
