from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models

from database import engine

from routers import tasks
from routers import recurring_tasks
from routers import auth


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(tasks.router)
app.include_router(recurring_tasks.router)
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {
        "message": "AI Task Dashboard API is running"
    }