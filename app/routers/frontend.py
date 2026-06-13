from pathlib import Path
from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

BASE_PATH = Path(__file__).parent.parent.parent / "web/templates"
STATIC_PATH = Path(__file__).parent.parent.parent / "web/static"

@router.get("/")
async def home():
    return FileResponse(BASE_PATH / "index.html")

@router.get("/manifest.json")
async def manifest():
    return FileResponse(STATIC_PATH / "manifest.json", media_type="application/manifest+json")

@router.get("/sw.js")
async def service_worker():
    return FileResponse(STATIC_PATH / "sw.js", headers={
        "Service-Worker-Allowed": "/",
        "Cache-Control": "no-cache"
    })
