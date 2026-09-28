import { Link } from "react-router-dom";

function Result({ score, totalQuestions, onViewLeaderboard, onReset }) {
  console.log(
    "🎯 [Result.jsx] Props Diterima -> Score:",
    score,
    "| Total Questions:",
    totalQuestions,
  );

  if (!totalQuestions || totalQuestions === 0) {
    return (
      <div className="quiz-container" style={{ textAlign: "center" }}>
        <h1 className="quiz-title">⚠️ Waduh!</h1>
        <p className="feedback-message" style={{ margin: "20px 0" }}>
          Kamu belum mengerjakan quiz nih. Yuk, mulai quiz dulu!
        </p>
        <Link
          to="/"
          className="main-btn"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          🚀 Mulai Quiz Sekarang!!
        </Link>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedbackMessage = () => {
    if (percentage === 100) return " ✨ Luar biasa! Kamu dapat nilai sempurna!";
    if (percentage >= 75)
      return " 👏 Kerja bagus! Hasil yang sangat memuaskan!";
    if (percentage >= 50) return " 👍 Lumayan! Masih bisa ditingkatkan lagi!";
    return "💡 Jangan menyerah! Coba latihan lagi.";
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🎉 Quiz Selesai!</h1>
      <div className="result-score-box">
        <h2 className="final-score">
          Skor Kamu: <span>{score}</span> / {totalQuestions}
        </h2>
        <p className="feedback-message">{getFeedbackMessage()}</p>
      </div>

      <div className="action-buttons">
        <button className="main-btn" onClick={onViewLeaderboard}>
          🏆 Lihat Leaderboard
        </button>

        <button className="secondary-btn" onClick={onReset}>
          Atur Quiz Baru
        </button>
      </div>
    </div>
  );
}

export default Result;
