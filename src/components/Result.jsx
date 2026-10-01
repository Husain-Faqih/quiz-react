import { useState } from "react";
import { Link } from "react-router-dom";

function Result({
  score,
  totalQuestions,
  onViewLeaderboard,
  onReset,
  userAnswers = [],
}) {
  const [showDetail, setShowDetail] = useState(false);

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

      {userAnswers.length > 0 && (
        <button
          className="secondary-btn"
          onClick={() => setShowDetail((prev) => !prev)}
          style={{ width: "100%", margin: "15px 0" }}
        >
          {showDetail ? "▲ Sembunyikan Detail" : "▼ Lihat Detail"}
        </button>
      )}

      {showDetail && (
        <div className="review-section">
          <div className="review-list">
            {userAnswers.map((item, index) => (
              <div
                key={index}
                className={`review-card ${
                  item.isCorrect ? "correct-card" : "wrong-card"
                }`}
              >
                <p className="review-question" style={{ margin: "0 0 6px 0" }}>
                  <strong>Soal {index + 1}:</strong> {item.question}
                </p>
                <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                  Jawaban Kamu:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: item.isCorrect ? "#4caf50" : "#f44336",
                    }}
                  >
                    {item.selectedAnswer}
                  </span>{" "}
                  {item.isCorrect ? "✅" : "❌"}
                </p>
                {!item.isCorrect && (
                  <p
                    style={{
                      color: "#4caf50",
                      margin: "4px 0",
                      fontSize: "0.9rem",
                    }}
                  >
                    Jawaban Benar: <strong>{item.correctAnswer}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
