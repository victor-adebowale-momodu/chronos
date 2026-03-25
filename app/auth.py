from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)

from app.config import settings

TOKEN_LIFETIME_SECONDS = 24 * 60 * 60

cookie_transport = CookieTransport(
    cookie_name="chronos_auth",
    cookie_max_age=TOKEN_LIFETIME_SECONDS,
)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.jwt_secret,
        lifetime_seconds=TOKEN_LIFETIME_SECONDS,
    )


auth_backend = AuthenticationBackend(
    name="jwt-cookie",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)
