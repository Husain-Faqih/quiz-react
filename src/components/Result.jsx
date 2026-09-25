function Result({ score, totalQuestions, onViewLeaderboard, onReset }) {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const getFeedbackMessage = () => {
    if (percentage === 100) return " ✨ Luar biasa! Kamu dapat nilai sempurna!";
    if (percentage >= 75)
      return " 👏 Kerja bagus! Hasil yang sangat memuaskan!";
    if (percentage >= 50) return " 👍 Lumayan! Masih bisa di tingkatkan lagi!";
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
