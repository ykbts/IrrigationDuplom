from typing import Optional

import bcrypt
from core.db import database
from Models.tables import users
from sqlalchemy import select


async def register_user(username: str, email: str, password: str) -> int:
    query = select(users).where((users.c.email == email) | (users.c.username == username))
    existing_user = await database.fetch_one(query)
    if existing_user:
        raise ValueError("Користувач з таким email або username вже існує.")

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    query = users.insert().values(
        username=username,
        email=email,
        password_hash=hashed_password
    )
    user_id = await database.execute(query)
    return user_id


async def login_user(username: str, password: str) -> Optional[int]:
    query = select(users).where(users.c.username == username)
    user = await database.fetch_one(query)
    if not user:
        return None

    is_valid = bcrypt.checkpw(password.encode('utf-8'), user["password_hash"].encode('utf-8'))
    if not is_valid:
        return None

    return user["id"]

