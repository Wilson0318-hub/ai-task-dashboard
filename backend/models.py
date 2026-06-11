from sqlalchemy import Column,Integer, String
from database import Base

class Task (Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    status = Column(String, default = "todo")
    priority = Column(String, default = "medium")
    startDate = Column(String, nullable=True)
    endDate = Column(String, nullable=True)

class RecurringTask(Base):
    __tablename__ = "recurring_tasks"

    id = Column(Integer, primary_key= True, index=True)
    text = Column( String, nullable=False)
    repeatType = Column(String, default="daily")
    isDoneToday = Column(Integer, default=0)