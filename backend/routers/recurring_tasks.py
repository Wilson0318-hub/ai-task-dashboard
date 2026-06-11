from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="/recurring-tasks",
    tags=["Recurring Tasks"]
)

def get_db():
    db =SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=list[schemas.RecurringTaskResponse])
def get_recurring_tasks(db: Session = Depends(get_db)):
    recurring_tasks =db.query(models.RecurringTask).all()

    return recurring_tasks

@router.post("", response_model=schemas.RecurringTaskResponse)
def create_recurring_task(
    recurring_task: schemas.RecurringTaskCreate,
    db: Session =Depends(get_db)
):
    new_recurring_task = models.RecurringTask(
        text = recurring_task.text,
        repeatType = recurring_task.repeatType,
        isDoneToday=recurring_task.isDoneToday
    )

    db.add(new_recurring_task)
    db.commit()
    db.refresh(new_recurring_task)

    return new_recurring_task

@router.put("/{recurring_task_id}/toggle", response_model=schemas.RecurringTaskResponse)
def toggle_recurring_task(
    recurring_task_id: int,
    db: Session =Depends(get_db)
):
    
    recurring_task = db.query(models.RecurringTask).filter(
        models.RecurringTask.id == recurring_task_id
    ).first()

    if recurring_task is None:
        raise HTTPException(
            status_code=404,
            detail="Recurring task not found"
        )
    
    if recurring_task.isDoneToday == 0:
        recurring_task.isDoneToday = 1
    else:
        recurring_task.isDoneToday = 0

    db.commit()
    db.refresh(recurring_task)

    return recurring_task

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal


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
def get_recurring_tasks(db: Session = Depends(get_db)):
    recurring_tasks = db.query(models.RecurringTask).all()

    return recurring_tasks


@router.post("", response_model=schemas.RecurringTaskResponse)
def create_recurring_task(
    recurring_task: schemas.RecurringTaskCreate,
    db: Session = Depends(get_db)
):
    new_recurring_task = models.RecurringTask(
        text=recurring_task.text,
        repeatType=recurring_task.repeatType,
        isDoneToday=recurring_task.isDoneToday
    )

    db.add(new_recurring_task)
    db.commit()
    db.refresh(new_recurring_task)

    return new_recurring_task


@router.put("/{recurring_task_id}/toggle", response_model=schemas.RecurringTaskResponse)
def toggle_recurring_task(
    recurring_task_id: int,
    db: Session = Depends(get_db)
):
    recurring_task = db.query(models.RecurringTask).filter(
        models.RecurringTask.id == recurring_task_id
    ).first()

    if recurring_task is None:
        raise HTTPException(
            status_code=404,
            detail="Recurring task not found"
        )

    if recurring_task.isDoneToday == 0:
        recurring_task.isDoneToday = 1
    else:
        recurring_task.isDoneToday = 0

    db.commit()
    db.refresh(recurring_task)

    return recurring_task


@router.delete("/{recurring_task_id}")
def delete_recurring_task(
    recurring_task_id: int,
    db: Session = Depends(get_db)
):
    recurring_task = db.query(models.RecurringTask).filter(
        models.RecurringTask.id == recurring_task_id
    ).first()

    if recurring_task is None:
        raise HTTPException(
            status_code=404,
            detail="Recurring task not found"
        )

    db.delete(recurring_task)
    db.commit()

    return {
        "message": "Recurring task deleted successfully",
        "deletedRecurringTaskId": recurring_task_id
    }