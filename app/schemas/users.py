import uuid
from typing import Optional

from fastapi_users import schemas
from pydantic import ConfigDict


class UserRead(schemas.BaseUser[uuid.UUID]):
    full_name: str

    model_config = ConfigDict(from_attributes=True)


class UserCreate(schemas.BaseUserCreate):
    full_name: str


class UserUpdate(schemas.BaseUserUpdate):
    full_name: Optional[str] = None
