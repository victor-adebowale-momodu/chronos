from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()
BASE_PATH = Path(__file__).parent.parent.parent / "web/templates"


@router.get("/")
async def home():
    return FileResponse(BASE_PATH / "index.html")


@router.get("/auth")
async def auth():
    return FileResponse(BASE_PATH / "auth.html")
