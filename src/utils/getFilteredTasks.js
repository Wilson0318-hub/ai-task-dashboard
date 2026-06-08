import getTaskDateStatus from "./getTaskDateStatus";

function getFilteredTasks(
    tasks,
    priorityFilter,
    dateFilter,
    sortType
){
    let filteredTasks = [...tasks];

    if(priorityFilter !== "all"){
        filteredTasks = filteredTasks.filter(
            task => task.priority === priorityFilter
        );
    }

    if(dateFilter !== "all"){
        filteredTasks = filteredTasks.filter(task => {
            const dateStatus = getTaskDateStatus(task);

            if(!dateStatus){
                return false;
            }

            if (dateFilter === "overdue"){
                return dateStatus.label === "已逾期";
            }

            if (dateFilter === "today") {
                return dateStatus.label === "今天截止";
            }

            if (dateFilter === "soon") {
                return dateStatus.className === "date-warning";
            }

            if (dateFilter === "normal") {
                return dateStatus.className === "date-normal";
            }

            return true;
        });
    }

    if (sortType == "priority") {
        const priorityOrder ={
            high: 1,
            medium: 2,
            low: 3
        };

    filteredTasks.sort((a, b) =>{
        return(
            priorityOrder[a.priority || "medium"]-
            priorityOrder[b.priority || "medium"]
        );
    });
    }

    if (sortType === "endDate") {
    filteredTasks.sort((a, b) => {
      if (!a.endDate && !b.endDate) {
        return 0;
      }

      if (!a.endDate) {
        return 1;
      }

      if (!b.endDate) {
        return -1;
      }

      return new Date(a.endDate) - new Date(b.endDate);
    });
  }

  return filteredTasks;
}

export default getFilteredTasks;