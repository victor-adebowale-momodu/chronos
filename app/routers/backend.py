from fastapi import APIRouter, Depends
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
