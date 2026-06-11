from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHMY_DATABASE_URL="sqlite:///./task_dashboard.db"

engine = create_engine(
    SQLALCHMY_DATABASE_URL,
    connect_args={
        "check_same_thread":False
    }
)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush= False,
    bind = engine
)

Base=declarative_base()