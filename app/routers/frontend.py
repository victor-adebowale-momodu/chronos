import hashlib
import json
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse, Response

router = APIRouter()
BASE_PATH = Path(__file__).parent.parent.parent / "web/templates"
STATIC_PATH = Path(__file__).parent.parent.parent / "web/static"


def file_hash(path: Path) -> str:
    try:
        return hashlib.md5(path.read_bytes()).hexdigest()[:8]
    except FileNotFoundError:
        return "0"


def build_precache_manifest() -> str:
    files = [
        {"url": "/static/styles.css", "path": STATIC_PATH / "styles.css"},
        {"url": "/static/js/app.js", "path": STATIC_PATH / "js/app.js"},
        {
            "url": "/static/js/components/charts.js",
            "path": STATIC_PATH / "js/components/charts.js",
        },
        {
            "url": "/static/js/services/api.js",
            "path": STATIC_PATH / "js/services/api.js",
        },
        {"url": "/static/js/services/db.js", "path": STATIC_PATH / "js/services/db.js"},
    ]

    manifest = [{"url": "/", "revision": file_hash(BASE_PATH / "index.html")}]
    for entry in files:
        manifest.append({"url": entry["url"], "revision": file_hash(entry["path"])})

    return json.dumps(manifest)


@router.get("/")
async def home():
    return FileResponse(BASE_PATH / "index.html")


@router.get("/manifest.json")
async def manifest():
    return FileResponse(
        STATIC_PATH / "manifest.json", media_type="application/manifest+json"
    )


@router.get("/sw.js")
async def service_worker():
    dynamic_manifest = build_precache_manifest()

    sw_content = (STATIC_PATH / "sw.js").read_text()
    sw_content = sw_content.replace("__PRECACHE_MANIFEST__", dynamic_manifest)

    return Response(
        content=sw_content,
        media_type="application/javascript",
        headers={
            "Service-Worker-Allowed": "/",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    )
