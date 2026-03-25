from fastapi import APIRouter, Depends
from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Event, Session, User
from app.schemas.events import SessionEventsCreate
from app.users import current_active_user

router = APIRouter(prefix="/api")


@router.post("/events")
async def create_event(
    body: SessionEventsCreate,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        session = Session(user_id=user.id)
        db.add(session)
        await db.flush()

        events_to_insert = [
            {**event.model_dump(), "session_id": session.id} for event in body.events
        ]
        await db.execute(insert(Event), events_to_insert)
        await db.commit()
        return {"session_id": session.id, "events": body.events}

    except Exception:
        await db.rollback()
        raise
