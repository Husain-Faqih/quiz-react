import { Link } from "react-router-dom";

function Leaderboard({ history = [], onClearHistory }) {
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

  const sortedHistory = [...history].sort((a, b) => {
    const ratioDiff = getRatio(b) - getRatio(a);
    if (ratioDiff !== 0) return ratioDiff;

    return (b.rawScore || 0) - (a.rawScore || 0);
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
            {sortedHistory.map((item, index) => {
              const uniqueKey = item.id || `${item.date}-${index}`;

              return (
                <li key={uniqueKey}>
                  <strong>Skor: {item.score || 0}</strong> | Kategori:{" "}
                  {item.category || "Semua"} | Kesulitan:{" "}
                  {item.difficulty || "Semua"} | Tanggal: {item.date || "-"}
                </li>
              );
            })}
          </ul>
        )}

        {sortedHistory.length > 0 && (
          <button className="clear-button" onClick={onClearHistory}>
            🗑️ Hapus Semua Riwayat
          </button>
        )}
      </div>

      <Link to="/" className="btn">
        Kembali ke Pengaturan
      </Link>
    </div>
  );
}

export default Leaderboard;
