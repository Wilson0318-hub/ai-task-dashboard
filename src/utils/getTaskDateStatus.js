function getTaskDateStatus(task) {
    if(!task.endDate){
        return null;
    }

    const today = new Date();
    const endDate = new Date(task.endDate);

    today.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);

    const diffTime = endDate - today;

    const diffDays = diffTime / (1000*60*60*24);

    if (diffDays <0){
        return{
            label :"已逾期",
            className: "date-danger"
        };
    }

    if (diffDays === 0) {
        return {
        label: "今天截止",
        className: "date-today"
        };
    }

    if (diffDays <= 3) {
        return {
        label: `剩 ${diffDays} 天截止`,
        className: "date-warning"
        };
    }

    return{
        label: "時間正常",
        className: "date-normal"
    };
}

export default getTaskDateStatus;