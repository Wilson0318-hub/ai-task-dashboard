from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()

    return tasks


@router.post("", response_model=schemas.TaskResponse)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db)
):
    new_task = models.Task(
        text=task.text,
        status=task.status,
        priority=task.priority,
        startDate=task.startDate,
        endDate=task.endDate
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    updated_task: schemas.TaskUpdate,
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.text = updated_task.text
    task.status = updated_task.status
    task.priority = updated_task.priority
    task.startDate = updated_task.startDate
    task.endDate = updated_task.endDate

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully",
        "deletedTaskId": task_id
    }