import { useState } from "react";
import { Link } from "react-router-dom";

function History({ history = [], onDeleteItem, onClearHistory }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    ...new Set(history.map((item) => item.category).filter(Boolean)),
  ];

  const filteredHistory =
    selectedCategory === "Semua"
      ? history
      : history.filter((item) => item.category === selectedCategory);

  const totalQuiz = filteredHistory.length;

  const getPercentage = (item) => {
    if (
      item?.score &&
      typeof item.score === "string" &&
      item.score.includes("/")
    ) {
      const [score, total] = item.score.split("/").map(Number);
      return total > 0 ? (score / total) * 100 : 0;
    }
    return item?.rawScore || 0;
  };

  const averageScore =
    totalQuiz > 0
      ? (
          filteredHistory.reduce((sum, item) => sum + getPercentage(item), 0) /
          totalQuiz
        ).toFixed(1)
      : 0;

  const highestScore =
    totalQuiz > 0
      ? Math.max(...filteredHistory.map((item) => getPercentage(item))).toFixed(
          0,
        )
      : 0;

  const getRatio = (item) => {
    if (
      item?.score &&
      typeof item.score === "string" &&
      item.score.includes("/")
    ) {
      const [score, total] = item.score.split("/").map(Number);
      return total > 0 ? score / total : 0;
    }
    return item?.rawScore || 0;
  };

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    const ratioDiff = getRatio(b) - getRatio(a);
    if (ratioDiff !== 0) return ratioDiff;
    return (b.rawScore || 0) - (a.rawScore || 0);
  });

  const handleClearAllWithConfirm = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all quiz history??",
    );
    if (isConfirmed && typeof onClearHistory === "function") {
      onClearHistory();
    }
  };

  const handleDeleteItemWithConfirm = (targetId, originalIndex) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this history??",
    );
    if (isConfirmed && typeof onDeleteItem === "function") {
      onDeleteItem(targetId, originalIndex);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">History</h1>

      <div className="stats-container">
        <div className="stats-title">📊 Summary Statistics</div>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Total Quizzes</span>
            <span className="stat-value">{totalQuiz}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Average</span>
            <span className="stat-value">{averageScore}%</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Highest</span>
            <span className="stat-value">{highestScore}%</span>
          </div>
        </div>
      </div>

      <div className="filter-container">
        <label htmlFor="category-select">Category Filter:</label>
        <select
          id="category-select"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="leaderboard-section">
        {sortedHistory.length === 0 ? (
          <p className="empty-message">No history saved yet.</p>
        ) : (
          <ul className="history-list">
            {sortedHistory.map((item, index) => {
              const originalIndex = history.indexOf(item);
              const uniqueKey = item.id || `${item.date}-${index}`;

              return (
                <li key={uniqueKey}>
                  <div>
                    <strong>Score: {item.score || 0}</strong> | Categori:{" "}
                    {item.category || "All"} | Difficulty:{" "}
                    {item.difficulty || "All"} | Date: {item.date || "-"}
                  </div>

                  <button
                    type="button"
                    className="delete-item-btn"
                    onClick={() =>
                      handleDeleteItemWithConfirm(item.id, originalIndex)
                    }
                    title="Hapus riwayat ini"
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="action-footer">
        <Link to="/" className="btn">
          Return to Settings
        </Link>
        {history.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClearAllWithConfirm}
          >
            🗑️ Clear All History
          </button>
        )}
      </div>
    </div>
  );
}

export default History;
