import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi_users import FastAPIUsers

from app.auth import auth_backend
from app.database import engine
from app.user_manager import get_user_manager
from app.models import User

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(lifespan=lifespan)


@app.get("/", response_class=FileResponse)
async def index():
    return FileResponse("templates/index.html")
