from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, index=True, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id=Column(Integer, nullable=False)

    text = Column(String, nullable=False)
    status = Column(String, default="todo")
    priority = Column(String, default="medium")
    startDate = Column(String, nullable=True)
    endDate = Column(String, nullable=True)


class RecurringTask(Base):
    __tablename__ = "recurring_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id=Column(Integer, nullable=False)

    text = Column(String, nullable=False)
    repeatType = Column(String, default="daily")
    isDoneToday = Column(Integer, default=0)


class RecurringTaskCompletion(Base):
    __tablename__ = "recurring_task_completions"

    id = Column(Integer, primary_key=True, index=True)

    recurringTaskId = Column(Integer, nullable=False)

    completedDate = Column(String, nullable=False)