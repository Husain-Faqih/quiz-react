import React from "react";
import "../style/Dashboard.css";

// Daftar Kategori Populer OpenTDB
const POPULAR_CATEGORIES = [
  { id: "", name: "Semua Kategori", icon: "🌐", count: "All" },
  { id: "18", name: "Computers & IT", icon: "💻", count: "100+ Soal" },
  { id: "31", name: "Anime & Manga", icon: "🎌", count: "80+ Soal" },
  { id: "21", name: "Sports", icon: "⚽", count: "90+ Soal" },
  { id: "9", name: "General Knowledge", icon: "🧠", count: "150+ Soal" },
  { id: "11", name: "Film & Movies", icon: "🎬", count: "110+ Soal" },
  { id: "12", name: "Music", icon: "🎵", count: "120+ Soal" },
  { id: "15", name: "Video Games", icon: "🎮", count: "140+ Soal" },
];

const DIFFICULTY_OPTIONS = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
  { id: "extreme", label: "Extreme" },
];

const QUESTION_COUNTS = ["10", "20", "50"];

export default function Dashboard({
  amount,
  setAmount,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  maxStreak,
  history,
  onStartQuiz,
}) {
  return (
    <div className="dashboard-container fade-in">
      {/* Top Bar / Header Simple */}
      <header className="dashboard-header">
        <h1 className="quiz-title">Logo & Trivia Quiz</h1>
        <p className="dashboard-subtitle">
          Uji pengetahuanmu dan cetak rekor streak tertinggi hari ini!
        </p>
      </header>

      {/* Main Grid: Left Side (Stats & History) + Right Side (Settings) */}
      <div className="dashboard-grid">
        {/* Panel Kiri: Stats & Recent History */}
        <div className="card stats-panel">
          <h2 className="panel-title">Leaderboard & Score</h2>

          <div className="streak-badge-box">
            <div className="streak-info">
              <span className="streak-icon">🔥</span>
              <div>
                <span className="streak-label">Best Streak</span>
                <p className="streak-value">{maxStreak} Consecutive</p>
              </div>
            </div>
          </div>

          <div className="history-section">
            <h3 className="section-subtitle">Top History</h3>
            {history.length === 0 ? (
              <p className="empty-history">Belum ada riwayat permainan.</p>
            ) : (
              <ul className="history-list">
                {history.slice(0, 3).map((item, index) => (
                  <li key={item.id || index} className="history-item">
                    <span className="history-rank">#{index + 1}</span>
                    <span className="history-cat">
                      {item.category === "Semua" ? "General" : item.category}
                    </span>
                    <span className="history-score">{item.score}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Panel Kanan: Setting Quiz */}
        <div className="card settings-panel">
          <h2 className="panel-title">Quiz Settings</h2>

          {/* Kategori Selector */}
          <div className="setting-group">
            <label className="setting-label">Category</label>
            <select
              className="select-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {POPULAR_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div className="setting-group">
            <label className="setting-label">Difficulty</label>
            <div className="options-grid">
              {DIFFICULTY_OPTIONS.map((diff) => (
                <button
                  key={diff.id}
                  type="button"
                  className={`opt-btn ${
                    difficulty === diff.id ? "active" : ""
                  }`}
                  onClick={() => setDifficulty(diff.id)}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Amount Selector */}
          <div className="setting-group">
            <label className="setting-label">Questions</label>
            <div className="options-grid">
              {QUESTION_COUNTS.map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  className={`opt-btn ${amount === cnt ? "active" : ""}`}
                  onClick={() => setAmount(cnt)}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button className="main-btn start-btn" onClick={onStartQuiz}>
            🚀 Start Quiz
          </button>
        </div>
      </div>

      {/* Grid Bottom: Popular Categories Cards */}
      <section className="categories-section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          {POPULAR_CATEGORIES.filter((c) => c.id !== "").map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${category === cat.id ? "selected" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <div className="category-details">
                <p className="category-name">{cat.name}</p>
                <span className="category-count">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
