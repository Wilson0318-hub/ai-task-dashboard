# AI Task Dashboard

AI Task Dashboard 是一個以 React、FastAPI、Supabase PostgreSQL 與 JWT Auth 建立的任務管理與資料分析平台。

系統支援使用者註冊登入、Kanban 任務看板、重複任務追蹤、Weekly Gantt Chart、任務統計卡片與完成率分析，並已部署於 Netlify 與 Render。

## Live Demo

Frontend：

https://ai-task-dashboard.netlify.app

Backend API：

https://ai-task-dashboard.onrender.com

Swagger Docs：

https://ai-task-dashboard.onrender.com/docs

## Features

* 使用者註冊與登入
* JWT Authentication
* Protected Routes
* 使用者資料隔離
* 任務新增、編輯、刪除
* Kanban Board
* Drag and Drop 任務狀態切換
* 優先級與日期設定
* 重複任務管理
* 今日、本週、本月完成率分析
* Weekly Gantt Chart
* Task Summary Cards
* Loading / Error / Empty State
* Logout

## Tech Stack

### Frontend

* React
* Vite
* React Router
* dnd-kit
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* JWT Auth
* Uvicorn

### Database

* Supabase PostgreSQL

### Deployment

* Netlify
* Render
* Supabase

## System Architecture

```text
User
↓
Netlify React Frontend
↓
Fetch API with JWT Token
↓
Render FastAPI Backend
↓
SQLAlchemy ORM
↓
Supabase PostgreSQL
```

## Authentication Flow

使用者登入後，後端會回傳 JWT access token。

前端會將 token 存入 localStorage，之後呼叫任務 API 時會自動帶上：

```text
Authorization: Bearer <token>
```

後端會根據 token 解析目前登入者，並只回傳該使用者自己的任務資料。

## Database Tables

主要資料表包含：

* users
* tasks
* recurring_tasks
* recurring_task_completions

其中 tasks 與 recurring_tasks 透過 user_id 與使用者綁定，確保每位使用者只能存取自己的資料。

## API Routes

### Auth

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/register | 註冊使用者           |
| POST   | /auth/login    | 登入並取得 JWT token |
| GET    | /auth/me       | 取得目前登入者資料       |

### Tasks

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| GET    | /tasks           | 取得目前使用者的任務  |
| POST   | /tasks           | 新增任務        |
| PUT    | /tasks/{task_id} | 更新任務        |
| DELETE | /tasks/{task_id} | 刪除任務        |

### Recurring Tasks

| Method | Endpoint                         | Description  |
| ------ | -------------------------------- | ------------ |
| GET    | /recurring-tasks                 | 取得目前使用者的重複任務 |
| POST   | /recurring-tasks                 | 新增重複任務       |
| PUT    | /recurring-tasks/{id}/toggle     | 切換今日完成狀態     |
| DELETE | /recurring-tasks/{id}            | 刪除重複任務       |
| GET    | /recurring-tasks/completions/all | 取得完成紀錄       |

## Local Development

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend URL：

```text
http://127.0.0.1:8000
```

Swagger Docs：

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
npm install
npm run dev
```

Frontend URL：

```text
http://localhost:5173
```

## Environment Variables

### Frontend `.env`

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Backend `.env`

```env
DATABASE_URL=sqlite:///./task_dashboard.db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL=http://localhost:5173
```

Production 使用 Supabase PostgreSQL：

```env
DATABASE_URL=postgresql+psycopg://username:password@host:6543/postgres
```

## Deployment

### Frontend

Platform：Netlify

```text
Build Command: npm run build
Publish Directory: dist
```

### Backend

Platform：Render

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Database

Platform：Supabase PostgreSQL

## Roadmap

目前已完成：

* React Frontend MVP
* FastAPI Backend
* SQLite to Supabase PostgreSQL Migration
* JWT Login System
* User-specific Data
* Netlify Frontend Deployment
* Render Backend Deployment
* Analytics Dashboard

未來可擴充：

* AI Assistant Backend
* Smart Scheduling
* Monthly Heatmap
* Streak Tracking
* Advanced Productivity Analytics

## Project Summary

AI Task Dashboard 是一個完整的全端任務管理與資料分析專案，涵蓋前端互動、後端 API、資料庫設計、登入驗證、使用者資料隔離與雲端部署，適合作為 React + FastAPI 全端作品集專案。
