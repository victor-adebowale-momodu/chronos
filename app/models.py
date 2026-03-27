import uuid
from datetime import datetime, timezone
from typing import List

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import DateTime, ForeignKey, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(SQLAlchemyBaseUserTableUUID, Base):
    full_name: Mapped[str] = mapped_column(String(100), unique=True, index=True)

    sessions: Mapped[List["Session"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"), index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )
    start_datetime: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    end_datetime: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    set_duration: Mapped[int]

    user: Mapped["User"] = relationship(back_populates="sessions")
