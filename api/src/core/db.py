from sqlmodel import create_engine, SQLModel
from src.core.settings import settings

engine  = create_engine(str(settings.PGSQL_DATABASE_URI))


async def init_db():
    SQLModel.metadata.create_all(engine)
