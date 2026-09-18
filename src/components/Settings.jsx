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
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Pengaturan Quiz</h1>
      <div className="settings-form">
        <label>Jumlah Soal:</label>
        <select value={amount} onChange={(e) => setAmount(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <label>Tingkat Kesulitan:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Semua Kesulitan</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label>Kategori:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Semua Kategori</option>
          <option value="9">General Knowledge</option>
          <option value="17">Science & Nature</option>
          <option value="21">Sports</option>
          <option value="11">Film</option>
        </select>

        <button className="next-button" onClick={onStart}>
          Mulai
        </button>

        <button
          className="btn"
          style={{ background: "#331455" }}
          onClick={onViewLeaderboard}
        >
          🏆 Lihat Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Settings;
