# AI Task Dashboard

AI Task Dashboard 是一個以 React 前端、Python FastAPI 後端與 SQLite 資料庫建立的任務管理與資料分析儀表板。

本專案從一般任務管理出發，延伸到任務排程視覺化與重複任務完成率分析。使用者可以新增一般任務、設定優先級、開始日期與截止日期，並透過 Kanban 看板管理任務狀態。同時，系統也支援每日、每週、每月重複任務，並能根據完成紀錄計算今日、本週與本月完成率。

---

## Project Overview

本專案的核心目標是建立一個 Productivity Dashboard，讓任務資料不只是停留在待辦清單，而是可以被整理、分析與視覺化。

系統目前包含三個主要部分：

1. 任務管理
   使用者可以新增、編輯、刪除一般任務，並在 Todo、Doing、Done 三種狀態之間切換。

2. 排程視覺化
   系統會根據任務的開始日期與截止日期，將任務顯示在 Weekly Gantt Chart 上。

3. 重複任務完成率分析
   系統會記錄重複任務每日完成狀態，並計算今日、本週與本月完成率。

---

## Features

### Task Management

* 新增一般任務
* 編輯任務名稱、優先級、開始日期、截止日期
* 刪除任務
* 任務狀態切換
* Kanban Board 顯示 Todo / Doing / Done
* 支援拖曳任務切換狀態
* 支援任務篩選與排序

### Recurring Tasks

* 新增重複任務
* 支援 daily / weekly / monthly 類型
* 勾選今日完成
* 取消今日完成
* 刪除重複任務
* 建立完成紀錄 completion records

### Analytics Dashboard

* Task Summary Cards

  * 總任務數
  * 待辦數
  * 進行中數
  * 已完成數
  * 逾期任務數
  * 高優先級任務數

* Weekly Gantt Chart

  * 根據 startDate / endDate 顯示任務時間區間
  * 支援上一週、本週、下一週切換
  * 沒有本週任務時顯示 Empty State

* Recurring Progress

  * 今日完成率
  * 本週完成率
  * 本月完成率
  * daily / weekly / monthly 任務數量統計
  * 依 repeatType 精準計算完成率

### User Experience

* Loading State
* Error State
* 重新載入按鈕
* Action Loading 防止重複點擊
* Delete Confirm 刪除確認
* Empty State
* RWD 基礎響應式設計

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS
* Fetch API
* dnd-kit

### Backend

* Python
* FastAPI
* SQLAlchemy
* Uvicorn

### Database

* SQLite
* SQLAlchemy ORM

---

## System Architecture

系統資料流如下：

```text
React Frontend
↓
Fetch API
↓
FastAPI Backend
↓
SQLAlchemy ORM
↓
SQLite Database
↓
FastAPI 回傳 JSON
↓
React 顯示 Board / Gantt Chart / Analytics Dashboard
```

前端負責使用者介面與資料呈現，後端負責 API、資料處理與資料庫操作。SQLite 負責儲存任務、重複任務與完成紀錄。

---

## Project Structure

```text
ai-task-dashboard
├── backend
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── routers
│       ├── tasks.py
│       └── recurring_tasks.py
│
├── src
│   ├── api
│   │   ├── taskApi.js
│   │   └── recurringTaskApi.js
│   │
│   ├── components
│   │   ├── common
│   │   │   ├── LoadingState.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── analytics
│   │   │   ├── TaskSummaryCards.jsx
│   │   │   ├── WeeklyGanttChart.jsx
│   │   │   └── RecurringProgressCards.jsx
│   │   │
│   │   ├── Sidebar.jsx
│   │   ├── TaskInput.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── KanbanColumn.jsx
│   │   ├── TaskCard.jsx
│   │   ├── FilterBar.jsx
│   │   └── AIAssistantPanel.jsx
│   │
│   ├── pages
│   │   ├── Board.jsx
│   │   └── Analytics.jsx
│   │
│   ├── utils
│   │   ├── getFilteredTasks.js
│   │   ├── getTaskDateStatus.js
│   │   ├── getWeekDays.js
│   │   ├── getTaskGanttPosition.js
│   │   ├── getTaskSummary.js
│   │   └── getRecurringProgress.js
│   │
│   └── styles
│       ├── index.css
│       ├── analytics.css
│       └── ...
│
├── package.json
└── README.md
```

---

## Database Tables

### tasks

| 欄位        | 說明                      |
| --------- | ----------------------- |
| id        | 任務 ID                   |
| text      | 任務名稱                    |
| status    | 任務狀態，包含 todo、doing、done |
| priority  | 優先級，包含 high、medium、low  |
| startDate | 開始日期                    |
| endDate   | 截止日期                    |

### recurring_tasks

| 欄位          | 說明                           |
| ----------- | ---------------------------- |
| id          | 重複任務 ID                      |
| text        | 重複任務名稱                       |
| repeatType  | 重複類型，包含 daily、weekly、monthly |
| isDoneToday | 今日是否完成，0 代表未完成，1 代表已完成       |

### recurring_task_completions

| 欄位              | 說明         |
| --------------- | ---------- |
| id              | 完成紀錄 ID    |
| recurringTaskId | 對應的重複任務 ID |
| completedDate   | 完成日期       |

---

## API Routes

### Task APIs

| Method | Endpoint         | 說明       |
| ------ | ---------------- | -------- |
| GET    | /tasks           | 取得所有一般任務 |
| POST   | /tasks           | 新增一般任務   |
| PUT    | /tasks/{task_id} | 更新一般任務   |
| DELETE | /tasks/{task_id} | 刪除一般任務   |

### Recurring Task APIs

| Method | Endpoint                                    | 說明       |
| ------ | ------------------------------------------- | -------- |
| GET    | /recurring-tasks                            | 取得所有重複任務 |
| POST   | /recurring-tasks                            | 新增重複任務   |
| PUT    | /recurring-tasks/{recurring_task_id}/toggle | 切換今日完成狀態 |
| DELETE | /recurring-tasks/{recurring_task_id}        | 刪除重複任務   |
| GET    | /recurring-tasks/completions/all            | 取得所有完成紀錄 |

---

## Core Logic

### Weekly Gantt Chart

系統會根據目前日期計算本週週一到週日，然後判斷每個任務的 startDate 與 endDate 是否與本週區間有交集。

如果任務落在本週範圍內，系統會計算它在甘特圖中的起始欄位與結束欄位，並透過 CSS Grid 顯示成橫向長條。

核心檔案：

```text
src/utils/getWeekDays.js
src/utils/getTaskGanttPosition.js
src/components/analytics/WeeklyGanttChart.jsx
```

### Recurring Progress

系統會記錄重複任務的完成日期，並根據 daily、weekly、monthly 類型計算完成率。

計算規則：

```text
daily   → 今日、本週、本月都計算
weekly  → 本週、本月計算
monthly → 本月計算
```

核心檔案：

```text
src/utils/getRecurringProgress.js
src/components/analytics/RecurringProgressCards.jsx
backend/routers/recurring_tasks.py
```

---

## How to Run Locally

### Backend

進入 backend 資料夾：

```bash
cd backend
```

建立虛擬環境：

```bash
python -m venv venv
```

啟動虛擬環境：

```bash
venv\Scripts\activate
```

安裝套件：

```bash
pip install -r requirements.txt
```

啟動 FastAPI：

```bash
uvicorn main:app --reload
```

後端預設網址：

```text
http://127.0.0.1:8000
```

Swagger API 文件：

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

回到專案根目錄：

```bash
cd ..
```

安裝套件：

```bash
npm install
```

啟動前端：

```bash
npm run dev
```

前端預設網址：

```text
http://localhost:5173
```

---

## Current Version

```text
Version: v2.0
Status: Completed
```

V2 已完成內容：

* FastAPI CRUD
* SQLite + SQLAlchemy
* React 串接後端
* Backend Router Refactor
* Recurring Tasks 後端化
* Weekly Gantt Dashboard
* Recurring Progress Tracking
* Task Summary Cards
* Empty State
* Component Refactor
* Loading / Error State
* Action Loading
* Delete Confirm
* Final QA

---

## Roadmap

### V3

* User Login System
* JWT Authentication
* User-specific Tasks
* PostgreSQL Migration
* Deployment
* Environment Variables

### V4

* AI Assistant Backend API
* Gemini / OpenAI API Integration
* Smart Scheduling
* AI Task Recommendation
* Advanced Habit Analytics
* Streak Calculation
* Monthly Heatmap

---

## What I Learned

透過本專案，我練習了以下能力：

* 使用 React 建立前端互動介面
* 使用 FastAPI 建立 Python 後端 API
* 使用 SQLAlchemy 操作資料庫
* 設計資料表與資料流程
* 使用 Fetch API 串接前後端
* 使用日期運算進行資料分析
* 將任務資料轉換成甘特圖與完成率 Dashboard
* 進行 React component refactor
* 加入 Loading、Error、Empty State 等產品化細節

---

## Summary

AI Task Dashboard 是一個結合任務管理、資料分析與資料視覺化的 Productivity Dashboard。專案透過 React 建立使用者介面，透過 Python FastAPI 建立後端 API，並使用 SQLite 儲存任務與完成紀錄。

目前 V2 版本已完成完整的任務管理、重複任務追蹤、甘特圖排程、完成率分析與基本產品化體驗，已具備展示與作品集使用價值。
