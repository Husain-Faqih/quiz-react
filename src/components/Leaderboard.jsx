import { Link } from "react-router-dom";

function Leaderboard({ history, onClearHistory }) {
  const sortedHistory = [...history].sort((a, b) => {
    const getRatio = (item) => {
      if (item.score && item.score.includes("/")) {
        const [score, total] = item.score.split("/").map(Number);
        return total > 0 ? score / total : 0;
      }
      return item.rawScore || 0;
    };
    return getRatio(b) - getRatio(a);
  });

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
      <Link to="/" className="btn">
        Kembali ke pengaturan
      </Link>
    </div>
  );
}

export default Leaderboard;
