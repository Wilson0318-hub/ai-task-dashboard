from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


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
    isDoneToday: int = 0


class RecurringTaskCreate(RecurringTaskBase):
    pass


class RecurringTaskResponse(RecurringTaskBase):
    id: int

    class Config:
        from_attributes = True


class RecurringTaskCompletionBase(BaseModel):
    recurringTaskId: int
    completedDate: str


class RecurringTaskCompletionCreate(RecurringTaskCompletionBase):
    pass


class RecurringTaskCompletionResponse(RecurringTaskCompletionBase):
    id: int

    class Config:
        from_attributes = True