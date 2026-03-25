from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    authentication_secret: SecretStr
    database_url: PostgresDsn
    jwt_secret: SecretStr
    reset_password_token_secret: SecretStr
    verification_token_secret: SecretStr

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()  # type: ignore
