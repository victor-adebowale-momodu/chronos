from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Session, User
from app.schemas.sessions import SessionCreate
from app.users import current_active_user

router = APIRouter(prefix="/api")


@router.post("/sessions")
async def create_session(
    body: SessionCreate,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db),
):
    session = Session(user_id=user.id, **body.model_dump())
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


@router.get("/sessions")
async def get_sessions(
    weeks_back: int = 0,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db),
):
    now = datetime.now()
    week_start = now - timedelta(days=now.weekday() + (weeks_back * 7))
    week_start = week_start.replace(hour=0, minute=0, second=0)
    week_end = week_start + timedelta(days=6)
    week_end = week_end.replace(
        hour=23,
        minute=59,
        second=59,
    )

    stmt = (
        select(Session)
        .where(Session.user_id == user.id)
        .where(Session.start_datetime >= week_start)
        .where(Session.start_datetime <= week_end)
        .order_by(Session.start_datetime)
    )

    result = await db.execute(stmt)
    sessions = result.scalars().all()
