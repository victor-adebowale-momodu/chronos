import uuid
from typing import Optional

from fastapi_users import schemas
from pydantic import ConfigDict


class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str

    model_config = ConfigDict(from_attributes=True)


class UserCreate(schemas.BaseUserCreate):
    username: str


class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str] = None
