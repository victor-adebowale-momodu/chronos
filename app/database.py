from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

engine = create_async_engine(
    url=settings.database_url.unicode_string(),
    echo=True,
    future=True,
)


AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def connect_db():
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        print("Database connected.")
    except Exception as e:
        print(f"CRITICAL: Database connection failed: {e}")
        raise e
