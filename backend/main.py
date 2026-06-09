from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()


class Task(BaseModel):
    id: Optional[int] = None
    text: str
    status: str = "todo"
    priority: str = "medium"
    startDate: Optional[str] = None
    endDate: Optional[str] = None


tasks = []


@app.get("/")
def read_root():
    return {
        "message": "AI Task Dashboard API is running"
    }


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def create_task(task: Task):
    new_task = task.model_dump()
    new_task["id"] = len(tasks) + 1

    tasks.append(new_task)

    return new_task


@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: Task):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            task_data = updated_task.model_dump()
            task_data["id"] = task_id

            tasks[index] = task_data

            return task_data
    
    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            deleted_task = tasks.pop(index)

            return {
                "message": "Task deleted successfully",
                "deletedTask": deleted_task
            }
    
    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )