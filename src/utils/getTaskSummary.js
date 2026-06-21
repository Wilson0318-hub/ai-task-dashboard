function parseDateOnly(dateString){
    if(!dateString){
        return null;
    }

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year,month-1, day);
}

function isTaskOverdue(task, today =new Date()){

    if(!task.endDate){
        return false;
    }

    if(task.status === "done"){
        return false;
    }

    const endDate =parseDateOnly(task.endDate);

    const todayDate = new Date(today);
    todayDate.setHours(0,0,0,0);

    return endDate < todayDate;
}

function getTaskSummary(tasks) {
    const totalTasks = tasks.length;

    const todoCount = tasks.filter(task => {
        return task.status === "todo";
    }).length;

    const doingCount = tasks.filter(task => {
        return task.status === "doing";
    }).length;

    const doneCount = tasks.filter(task => {
        return task.status === "done";
    }).length;

    const overdueCount = tasks.filter(task => {
        return isTaskOverdue(task);
    }).length

    const highPriorityCount = tasks.filter(task =>{
        return task.priority === "high";
    }).length;

    return{
        totalTasks,
        todoCount,
        doingCount,
        doneCount,
        overdueCount,
        highPriorityCount
    };
}

export default getTaskSummary;