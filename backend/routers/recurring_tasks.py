from datetime import date

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

import models
import schemas

from database import SessionLocal
from routers.auth import get_current_user


router = APIRouter(
    prefix="/recurring-tasks",
    tags=["Recurring Tasks"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[schemas.RecurringTaskResponse])
def get_recurring_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    recurring_tasks = db.query(models.RecurringTask).filter(
        models.RecurringTask.user_id == current_user.id
    ).all()

    return recurring_tasks


@router.get(
    "/completions/all",
    response_model=list[schemas.RecurringTaskCompletionResponse]
)
def get_recurring_task_completions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    completions = db.query(models.RecurringTaskCompletion).join(
        models.RecurringTask,
        models.RecurringTaskCompletion.recurringTaskId == models.RecurringTask.id
    ).filter(
        models.RecurringTask.user_id == current_user.id
    ).all()

    return completions


@router.post("", response_model=schemas.RecurringTaskResponse)
def create_recurring_task(
    recurring_task: schemas.RecurringTaskCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_recurring_task = models.RecurringTask(
        user_id=current_user.id,
        text=recurring_task.text,
        repeatType=recurring_task.repeatType,
        isDoneToday=recurring_task.isDoneToday
    )

    db.add(new_recurring_task)
    db.commit()
    db.refresh(new_recurring_task)

    return new_recurring_task


@router.put(
    "/{recurring_task_id}/toggle",
    response_model=schemas.RecurringTaskResponse
)
def toggle_recurring_task(
    recurring_task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    recurring_task = db.query(models.RecurringTask).filter(
        models.RecurringTask.id == recurring_task_id,
        models.RecurringTask.user_id == current_user.id
    ).first()

    if recurring_task is None:
        raise HTTPException(
            status_code=404,
            detail="Recurring task not found"
        )

    today = date.today().isoformat()

    existing_completion = db.query(
        models.RecurringTaskCompletion
    ).filter(
        models.RecurringTaskCompletion.recurringTaskId == recurring_task_id,
        models.RecurringTaskCompletion.completedDate == today
    ).first()

    if existing_completion:
        db.delete(existing_completion)
        recurring_task.isDoneToday = 0
    else:
        new_completion = models.RecurringTaskCompletion(
            recurringTaskId=recurring_task_id,
            completedDate=today
        )

        db.add(new_completion)
        recurring_task.isDoneToday = 1

    db.commit()
    db.refresh(recurring_task)

    return recurring_task


@router.delete("/{recurring_task_id}")
def delete_recurring_task(
    recurring_task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    recurring_task = db.query(models.RecurringTask).filter(
        models.RecurringTask.id == recurring_task_id,
        models.RecurringTask.user_id == current_user.id
    ).first()

    if recurring_task is None:
        raise HTTPException(
            status_code=404,
            detail="Recurring task not found"
        )

    db.query(models.RecurringTaskCompletion).filter(
        models.RecurringTaskCompletion.recurringTaskId == recurring_task_id
    ).delete()

    db.delete(recurring_task)
    db.commit()

    return {
        "message": "Recurring task deleted successfully",
        "deletedRecurringTaskId": recurring_task_id
    }