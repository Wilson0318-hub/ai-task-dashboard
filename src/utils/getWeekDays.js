function getWeekDays(baseDate = new Date()) {
    const date = new Date(baseDate);

    const day = date.getDay();

    const diffToMonday = day === 0
        ? -6
        : 1- day;

    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    monday.setHours(0,0,0,0);

    const weekDays = [];

    for(let i =0; i<7; i++){
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + i)

        weekDays.push(currentDate);
    }

    return weekDays;
}

export default getWeekDays;