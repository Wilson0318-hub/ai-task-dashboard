from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    text: str
    status: str = "todo"
    priority: str = "medium"
    startDate: Optional[str] = None
    endDate: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass


class TaskResponse(TaskBase):
    id: int

    class Config:
        from_attributes = True

class RecurringTaskBase(BaseModel):
    text: str
    repeatType: str = "daily"
    isDoneToday: int =0

class RecurringTaskCreate(RecurringTaskBase):
    pass

class RecurringTaskResponse(RecurringTaskBase):
    id: int

    class config:
        from_attributes = True