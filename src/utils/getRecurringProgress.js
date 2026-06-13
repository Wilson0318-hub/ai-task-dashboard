function formatDateToString(date){
    const year = date.getFullYear();

    const month = String(date.getMonth()+1).padStart(2,"0");

    const day = String(date.getDate()).padStart(2,"0");

    return `${year}-${month}-${day}`;
}

function getWeekRange(baseDate = new Date()){
    const date = new Date(baseDate);

    const day = date.getDay();

    const diffToMonday = day === 0
     ? -6
     : 1- day;

     const monday = new Date(date);
     monday.setDate(date.getDate()+ diffToMonday);
     monday.setHours(0,0,0,0);

     const sunday = new Date(monday);
     sunday.setDate(monday.getDate() +6);
     sunday.setHours(0,0,0,0);

     return {
        weekStart: monday,
        weekEnd: sunday
     };
}

function isDateInRange(dateString, startDate, endDate) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);

  return date >= startDate && date <= endDate;
}

function getRecurringProgress(recurringTasks, completions) {
  const today = new Date();

  const todayString = formatDateToString(today);

  const { weekStart, weekEnd } = getWeekRange(today);

  const monthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const monthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  monthStart.setHours(0, 0, 0, 0);
  monthEnd.setHours(0, 0, 0, 0);

  const totalRecurringTasks = recurringTasks.length;

  const todayCompletedCount = completions.filter(completion => {
    return completion.completedDate === todayString;
  }).length;

  const weekCompletedCount = completions.filter(completion => {
    return isDateInRange(
      completion.completedDate,
      weekStart,
      weekEnd
    );
  }).length;

  const monthCompletedCount = completions.filter(completion => {
    return isDateInRange(
      completion.completedDate,
      monthStart,
      monthEnd
    );
  }).length;

  const todayTargetCount = totalRecurringTasks;

  const weekTargetCount = totalRecurringTasks * 7;

  const monthTargetCount =
    totalRecurringTasks * monthEnd.getDate();

  const todayRate = todayTargetCount === 0
    ? 0
    : Math.round((todayCompletedCount / todayTargetCount) * 100);

  const weekRate = weekTargetCount === 0
    ? 0
    : Math.round((weekCompletedCount / weekTargetCount) * 100);

  const monthRate = monthTargetCount === 0
    ? 0
    : Math.round((monthCompletedCount / monthTargetCount) * 100);

  return {
    totalRecurringTasks,

    todayCompletedCount,
    todayTargetCount,
    todayRate,

    weekCompletedCount,
    weekTargetCount,
    weekRate,

    monthCompletedCount,
    monthTargetCount,
    monthRate
  };
}

export default getRecurringProgress;