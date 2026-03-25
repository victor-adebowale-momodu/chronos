from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.post("/events")
async def create_event():
    return {"status": "ok"}
