function TaskInput ({
    taskText,
    setTaskText,
    addTask
}){

    return(
        <div className="task-input-card">

            <h3>
                新增任務
            </h3>

            <input 
            className="task-input"
            type="text"
            placeholder="請輸入任務名稱"
            value={taskText}
            onChange={(e)=>
                setTaskText(e.target.value)
            }
             />
            
            <button
                onClick={addTask}
            >
                新增任務
            </button>
        </div>
    )
}

export default TaskInput;