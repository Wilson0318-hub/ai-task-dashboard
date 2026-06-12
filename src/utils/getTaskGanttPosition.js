function getTaskGanttPosition(task, weekDays) {
  if (!task.startDate && !task.endDate) {
    return null;
  }

  const taskStartDate = task.startDate
    ? new Date(task.startDate)
    : new Date(task.endDate);

  const taskEndDate = task.endDate
    ? new Date(task.endDate)
    : new Date(task.startDate);

  taskStartDate.setHours(0, 0, 0, 0);
  taskEndDate.setHours(0, 0, 0, 0);

  const weekStartDate = new Date(weekDays[0]);
  const weekEndDate = new Date(weekDays[6]);

  weekStartDate.setHours(0, 0, 0, 0);
  weekEndDate.setHours(0, 0, 0, 0);

  if (taskEndDate < weekStartDate || taskStartDate > weekEndDate) {
    return null;
  }

  const visibleStartDate = taskStartDate < weekStartDate
    ? weekStartDate
    : taskStartDate;

  const visibleEndDate = taskEndDate > weekEndDate
    ? weekEndDate
    : taskEndDate;

  const startIndex = weekDays.findIndex(date => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() === visibleStartDate.getTime();
  });

  const endIndex = weekDays.findIndex(date => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() === visibleEndDate.getTime();
  });

  return {
    startColumn: startIndex + 1,
    endColumn: endIndex + 2
  };
}

export default getTaskGanttPosition;