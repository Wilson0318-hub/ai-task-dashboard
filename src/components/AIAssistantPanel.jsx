function AIAssistantPanel ({ tasks }){
    const todoTasks = tasks.filter(
        task => task.status === "todo"
    );

    const doingTasks = tasks.filter(
        task => task.status === "doing"
    );

    const doneTasks = tasks.filter(
        task => task.status === "done"
    );
    
    const suggestedTask = todoTasks[0];

    let message = "目前任務狀況穩定";

    if(todoTasks.length > 5){
        message = "待辦事項偏多，建議先整理優先順序。";
    } else if (doingTasks.length > 3) {
        message = "進行中的任務較多，建議先完成手上的工作。";
    } else if (doneTasks.length >= 5) {
        message = "今天完成很多任務，做得不錯！";
    }
    return(
        <div className="ai-panel">
            <h3>AI Assistant</h3>

            <div className="ai-stats">
                <p>待辦：{todoTasks.length}</p>
                <p>進行中：{doingTasks.length}</p>
                <p>已完成：{doneTasks.length}</p>
            </div>

            <div className="ai-section">
                <h4>建議先完成</h4>

                <p>
                {suggestedTask
                    ? suggestedTask.text
                    : "目前沒有待辦事項"}
                </p>
            </div>

            <div className="ai-section">
                <h4>今日提醒</h4>
                <p>{message}</p>
            </div>
    
        </div>

    )
}

export default AIAssistantPanel;