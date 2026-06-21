function formatDateToString(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function getWeekRange(baseDate = new Date()) {
  const date = new Date(baseDate);

  const day = date.getDay();

  const diffToMonday = day === 0
    ? -6
    : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(0, 0, 0, 0);

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


function getWeeksInMonth(monthStart, monthEnd) {
  let weekCount = 0;

  const currentDate = new Date(monthStart);

  while (currentDate <= monthEnd) {
    weekCount += 1;
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return weekCount;
}


function getTasksByRepeatType(recurringTasks, repeatType) {
  return recurringTasks.filter(task => {
    return task.repeatType === repeatType;
  });
}


function getTaskIdSet(tasks) {
  return new Set(
    tasks.map(task => {
      return task.id;
    })
  );
}


function getCompletionCountByTaskIds(completions, taskIdSet, isMatchDate) {
  return completions.filter(completion => {
    const isSameTaskType = taskIdSet.has(completion.recurringTaskId);

    const isDateMatched = isMatchDate(completion.completedDate);

    return isSameTaskType && isDateMatched;
  }).length;
}


function getTargetCounts(recurringTasks, monthEnd) {
  const dailyTasks = getTasksByRepeatType(recurringTasks, "daily");

  const weeklyTasks = getTasksByRepeatType(recurringTasks, "weekly");

  const monthlyTasks = getTasksByRepeatType(recurringTasks, "monthly");

  const monthDays = monthEnd.getDate();

  const monthStart = new Date(
    monthEnd.getFullYear(),
    monthEnd.getMonth(),
    1
  );

  monthStart.setHours(0, 0, 0, 0);

  const weeksInMonth = getWeeksInMonth(monthStart, monthEnd);

  const todayTargetCount = dailyTasks.length;

  const weekTargetCount =
    dailyTasks.length * 7 +
    weeklyTasks.length;

  const monthTargetCount =
    dailyTasks.length * monthDays +
    weeklyTasks.length * weeksInMonth +
    monthlyTasks.length;

  return {
    dailyTasks,
    weeklyTasks,
    monthlyTasks,

    dailyCount: dailyTasks.length,
    weeklyCount: weeklyTasks.length,
    monthlyCount: monthlyTasks.length,

    todayTargetCount,
    weekTargetCount,
    monthTargetCount
  };
}


function calculateRate(completedCount, targetCount) {
  if (targetCount === 0) {
    return 0;
  }

  const rate = Math.round((completedCount / targetCount) * 100);

  return Math.min(rate, 100);
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

  const {
    dailyTasks,
    weeklyTasks,
    monthlyTasks,

    dailyCount,
    weeklyCount,
    monthlyCount,

    todayTargetCount,
    weekTargetCount,
    monthTargetCount
  } = getTargetCounts(recurringTasks, monthEnd);

  const dailyTaskIds = getTaskIdSet(dailyTasks);

  const weeklyTaskIds = getTaskIdSet(weeklyTasks);

  const monthlyTaskIds = getTaskIdSet(monthlyTasks);

  const todayCompletedCount = getCompletionCountByTaskIds(
    completions,
    dailyTaskIds,
    completedDate => {
      return completedDate === todayString;
    }
  );

  const weekDailyCompletedCount = getCompletionCountByTaskIds(
    completions,
    dailyTaskIds,
    completedDate => {
      return isDateInRange(completedDate, weekStart, weekEnd);
    }
  );

  const weekWeeklyCompletedCount = getCompletionCountByTaskIds(
    completions,
    weeklyTaskIds,
    completedDate => {
      return isDateInRange(completedDate, weekStart, weekEnd);
    }
  );

  const weekCompletedCount =
    weekDailyCompletedCount +
    weekWeeklyCompletedCount;

  const monthDailyCompletedCount = getCompletionCountByTaskIds(
    completions,
    dailyTaskIds,
    completedDate => {
      return isDateInRange(completedDate, monthStart, monthEnd);
    }
  );

  const monthWeeklyCompletedCount = getCompletionCountByTaskIds(
    completions,
    weeklyTaskIds,
    completedDate => {
      return isDateInRange(completedDate, monthStart, monthEnd);
    }
  );

  const monthMonthlyCompletedCount = getCompletionCountByTaskIds(
    completions,
    monthlyTaskIds,
    completedDate => {
      return isDateInRange(completedDate, monthStart, monthEnd);
    }
  );

  const monthCompletedCount =
    monthDailyCompletedCount +
    monthWeeklyCompletedCount +
    monthMonthlyCompletedCount;

  const todayRate = calculateRate(
    todayCompletedCount,
    todayTargetCount
  );

  const weekRate = calculateRate(
    weekCompletedCount,
    weekTargetCount
  );

  const monthRate = calculateRate(
    monthCompletedCount,
    monthTargetCount
  );

  return {
    totalRecurringTasks,

    dailyCount,
    weeklyCount,
    monthlyCount,

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