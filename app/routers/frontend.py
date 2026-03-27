from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()
BASE_PATH = Path(__file__).parent.parent.parent / "web"


@router.get("/")
async def home():
    return FileResponse(BASE_PATH / "index.html")


@router.get("/signup")
async def signup():
    return FileResponse(BASE_PATH / "signup.html")


@router.get("/login")
async def login():
    return FileResponse(BASE_PATH / "login.html")
