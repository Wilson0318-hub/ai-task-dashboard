function RecurringProgressCards({
  recurringTasks,
  recurringProgress
}) {
  return (
    <section className="recurring-progress-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            重複任務進度
          </h2>

          <p className="section-description">
            根據 daily、weekly、monthly 任務類型計算完成率。
          </p>
        </div>

        <div className="repeat-type-summary">
          <span>Daily：{recurringProgress.dailyCount}</span>
          <span>Weekly：{recurringProgress.weeklyCount}</span>
          <span>Monthly：{recurringProgress.monthlyCount}</span>
        </div>
      </div>

      {recurringTasks.length === 0 ? (
        <div className="recurring-empty-state">
          <p className="gantt-empty-title">
            尚未建立重複任務
          </p>

          <p className="gantt-empty-description">
            可以到 Board 左側新增每日、每週或每月重複任務。
          </p>
        </div>
      ) : (
        <div className="progress-card-grid">
          <div className="progress-card">
            <p className="progress-label">
              今日完成率
            </p>

            <h3 className="progress-value">
              {recurringProgress.todayRate}%
            </h3>

            <p className="progress-detail">
              {recurringProgress.todayCompletedCount} / {recurringProgress.todayTargetCount}
            </p>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${recurringProgress.todayRate}%`
                }}
              />
            </div>
          </div>

          <div className="progress-card">
            <p className="progress-label">
              本週完成率
            </p>

            <h3 className="progress-value">
              {recurringProgress.weekRate}%
            </h3>

            <p className="progress-detail">
              {recurringProgress.weekCompletedCount} / {recurringProgress.weekTargetCount}
            </p>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${recurringProgress.weekRate}%`
                }}
              />
            </div>
          </div>

          <div className="progress-card">
            <p className="progress-label">
              本月完成率
            </p>

            <h3 className="progress-value">
              {recurringProgress.monthRate}%
            </h3>

            <p className="progress-detail">
              {recurringProgress.monthCompletedCount} / {recurringProgress.monthTargetCount}
            </p>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${recurringProgress.monthRate}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecurringProgressCards;