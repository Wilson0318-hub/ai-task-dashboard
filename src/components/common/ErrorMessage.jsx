function ErrorMessage({
  message = "資料載入失敗，請稍後再試。",
  onRetry
}) {
  return (
    <div className="error-message">
      <div>
        <p className="error-title">
          發生錯誤
        </p>

        <p className="error-description">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          className="error-retry-button"
          onClick={onRetry}
        >
          重新載入
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;