from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "BugLens"
    DATABASE_URL: str = "sqlite:///./buglens.db"

    SECRET_KEY: str = "change-this-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    class Config:
        env_file = ".env"


settings = Settings()