from pydantic import BaseModel

class ModeRequest(BaseModel):
    auto_mode: bool
