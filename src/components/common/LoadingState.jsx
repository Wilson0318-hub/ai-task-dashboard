function LoadingState({ message = "資料載入中..." }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner" />

      <p className="loading-text">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;