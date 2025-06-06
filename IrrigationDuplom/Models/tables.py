from sqlalchemy import (
    Table,
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    TIMESTAMP,
    Boolean,
)
from core.db import metadata

roles = Table(
    "roles",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50), unique=True, nullable=False),
)

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("username", String(255), unique=True, nullable=False),
    Column("email", String(255), unique=True, nullable=False),
    Column("password_hash", String(255), nullable=False),
    Column("created_at", TIMESTAMP),
)

user_roles = Table(
    "user_roles",
    metadata,
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
)

devices = Table(
    "devices",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("device_code", Integer, unique=True, nullable=False),
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE")),
    Column("device_name", String(255), nullable=False),
    Column("device_description", String(50), nullable=False),
    Column("created_at", TIMESTAMP),
)

sensor_data = Table(
    "sensor_data",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("device_id", Integer, ForeignKey("devices.id", ondelete="CASCADE")),
    Column("temperature", Float),
    Column("humidity", Float),
    Column("soil_moisture", Float),
    Column("recorded_at", TIMESTAMP),
)

motor_state = Table(
    "motor_state",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("device_id", Integer, ForeignKey("devices.id", ondelete="CASCADE")),
    Column("state", Boolean, nullable=False),
    Column("set_at", TIMESTAMP),
)
