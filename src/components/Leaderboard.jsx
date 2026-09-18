function Leaderboard({ history, onClearHistory, onBack }) {
  const sortedHistory = [...history].sort((a, b) => b.rawScore - a.rawScore);

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🏆 Leaderboard / Riwayat</h1>

      <div className="leaderboard-section" style={{ borderTop: "none" }}>
        {sortedHistory.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            Belum ada riwayat tersimpan.
          </p>
        ) : (
          <ul className="history-list">
            {sortedHistory.map((item, index) => (
              <li key={index}>
                <strong>Skor: {item.score}</strong> | Kesulitan:{" "}
                {item.difficulty} | Tanggal: {item.date}
              </li>
            ))}
          </ul>
        )}

        {sortedHistory.length > 0 && (
          <button className="clear-button" onClick={onClearHistory}>
            🗑️ Hapus Semua Riwayat
          </button>
        )}
      </div>

      <button className="next-button" onClick={onBack}>
        Kembali ke Pengaturan
      </button>
    </div>
  );
}

export default Leaderboard;
