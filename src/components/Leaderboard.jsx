import { Link } from "react-router-dom";

function Leaderboard({ history = [], onDeleteItem, onClearHistory }) {
  // Hitung rasio skor
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

  // Mengurutkan riwayat
  const sortedHistory = [...history].sort((a, b) => {
    const ratioDiff = getRatio(b) - getRatio(a);
    if (ratioDiff !== 0) return ratioDiff;
    return (b.rawScore || 0) - (a.rawScore || 0);
  });

  // Konfirmasi Hapus Semua
  const handleClearAllWithConfirm = () => {
    const isConfirmed = window.confirm("Yakin mau hapus semua riwayat kuis?");
    if (isConfirmed && typeof onClearHistory === "function") {
      onClearHistory();
    }
  };

  // Konfirmasi Hapus Satu per Satu
  const handleDeleteItemWithConfirm = (targetId, originalIndex) => {
    const isConfirmed = window.confirm("Yakin mau hapus riwayat ini?");
    if (isConfirmed && typeof onDeleteItem === "function") {
      onDeleteItem(targetId, originalIndex);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🏆 Leaderboard / Riwayat</h1>

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

                  {/* Tombol Hapus Satuan */}
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

        {sortedHistory.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClearAllWithConfirm}
          >
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
