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

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🎮 Pengaturan Quiz</h1>

      <div className="settings-form">
        {/* Option Jumlah Soal (Pill Button) */}
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

        {/* Option Kesulitan (Pill Button) */}
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

        {/* Option Kategori (Custom Select) */}
        <div className="input-group">
          <label>📚 Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            <option value="21">Sports</option>
            <option value="11">Film</option>
          </select>
        </div>

        {/* Action Buttons */}
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
