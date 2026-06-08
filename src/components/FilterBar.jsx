function FilterBar({
    priorityFilter,
    setPriorityFilter,
    dateFilter,
    setDateFilter,
    sortType,
    setSortType
}) {
    return(
        <div className="filter-bar">
            <select
                className="filter-select"
                value={priorityFilter}
                onChange={(e)=>setPriorityFilter(e.target.value)}
            >
                <option value="all">全部優先級</option>
                <option value="high">高優先級</option>
                <option value="medium">中優先級</option>
                <option value="low">低優先級</option>
            </select>

            <select
                className="filter-select"
                value={dateFilter}
                onChange={(e)=>setDateFilter(e.target.value)}
                >
                    <option value="all">全部日期狀態</option>
                    <option value="overdue">已逾期</option>
                    <option value="today">今天截止</option>
                    <option value="soon">即將截止</option>
                    <option value="normal">時間正常</option>
                </select>

            <select
                className="filter-select"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
            >
                <option value="default">預設排序</option>
                <option value="priority">依優先級排序</option>
                <option value="endDate">依截止日期排序</option>
            </select>
        </div>
    );
}

export default FilterBar;