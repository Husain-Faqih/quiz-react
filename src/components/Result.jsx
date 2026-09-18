function Result({ score, totalQuestions, onViewLeaderboard, onReset }) {
  return (
    <div className="quiz-container result-container">
      <h1 className="quiz-title">🎉 Quiz Selesai!</h1>
      <h2 className="final-score">
        Skor Kamu: {score} /{totalQuestions}
      </h2>

      <button className="nex-button" onClick={onViewLeaderboard}>
        🏆 Lihat Leaderboard
      </button>

      <button
        className="btn"
        style={{ background: "#331455" }}
        onClick={onReset}
      >
        Atur Quiz Baru
      </button>
    </div>
  );
}

export default Result;
