import { useState } from "react";
import { Link } from "react-router-dom";

function Leaderboard({ history = [], onDeleteItem, onClearHistory }) {
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
    const isConfirmed = window.confirm("Yakin mau hapus semua riwayat kuis?");
    if (isConfirmed && typeof onClearHistory === "function") {
      onClearHistory();
    }
  };

  const handleDeleteItemWithConfirm = (targetId, originalIndex) => {
    const isConfirmed = window.confirm("Yakin mau hapus riwayat ini?");
    if (isConfirmed && typeof onDeleteItem === "function") {
      onDeleteItem(targetId, originalIndex);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🏆 Leaderboard & Riwayat</h1>

      <div className="stats-container">
        <div className="stats-title">📊 Statistik Ringkas</div>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Total Kuis</span>
            <span className="stat-value">{totalQuiz}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Rata-rata</span>
            <span className="stat-value">{averageScore}%</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Tertinggi</span>
            <span className="stat-value">{highestScore}%</span>
          </div>
        </div>
      </div>

      <div className="filter-container">
        <label htmlFor="category-select">Filter Kategori:</label>
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
          <p className="empty-message">Belum ada riwayat tersimpan.</p>
        ) : (
          <ul className="history-list">
            {sortedHistory.map((item, index) => {
              const originalIndex = history.indexOf(item);
              const uniqueKey = item.id || `${item.date}-${index}`;

              return (
                <li key={uniqueKey}>
                  <div>
                    <strong>Skor: {item.score || 0}</strong> | Kategori:{" "}
                    {item.category || "Semua"} | Kesulitan:{" "}
                    {item.difficulty || "Semua"} | Tanggal: {item.date || "-"}
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
          Kembali ke Pengaturan
        </Link>
        {history.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClearAllWithConfirm}
          >
            🗑️ Hapus Semua Riwayat
          </button>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
