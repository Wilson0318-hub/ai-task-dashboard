function getTaskForDate(tasks,date){
    const targetDate = new Date(date);
    targetDate.setHours(0,0,0,0);

    return tasks.filter(task=>{
        if(!task.startDate && !task.endDate){
            return false;
        }

        const startDate = task.startDate
        ? new Date(task.startDate)
        : new Date(task.endDate);

        const endDate = task.endDate
        ? new Date(task.endDate)
        : new Date(task.startDate);

        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);

        return targetDate >= startDate && targetDate <= endDate;
    });
}

export default getTaskForDate;