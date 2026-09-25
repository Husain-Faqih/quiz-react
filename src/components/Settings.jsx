function Settings({
  amount,
  setAmount,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  onStart,
  onViewLeaderboard,
}) {
  const amountOptions = ["5", "10", "15", "20"];
  const difficultyOptions = [
    { label: "Semua", value: "" },
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  const categoryOptions = [
    { label: "Semua Kategori", value: "" },
    { label: "General Knowledge", value: "9" },
    { label: "Film", value: "11" },
    { label: "Music", value: "12" },
    { label: "Computers / Tech", value: "18" },
    { label: "Science & Nature", value: "17" },
    { label: "Sports", value: "21" },
    { label: "Geography", value: "22" },
    { label: "History", value: "23" },
  ];

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🎮 Pengaturan Quiz</h1>

      <div className="settings-form">
        <div className="input-group">
          <label>🎯 Jumlah Soal</label>
          <div className="pill-group">
            {amountOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`pill-btn ${amount === opt ? "active" : ""}`}
                onClick={() => setAmount(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>⚡ Tingkat Kesulitan</label>
          <div className="pill-group">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`pill-btn ${difficulty === opt.value ? "active" : ""}`}
                onClick={() => setDifficulty(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>📚 Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          <button className="next-button main-btn" onClick={onStart}>
            🚀 Mulai Kuis
          </button>
          <button className="secondary-btn" onClick={onViewLeaderboard}>
            🏆 Lihat Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
