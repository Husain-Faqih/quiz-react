import { useState } from "react";
import { Link } from "react-router-dom";

function Result({
  maxStreak,
  score,
  totalQuestions,
  onViewHistory,
  onReset,
  userAnswers = [],
}) {
  const [showDetail, setShowDetail] = useState(false);

  if (!totalQuestions || totalQuestions === 0) {
    return (
      <div className="quiz-container empty-state-card">
        <div className="empty-state-icon">🧐</div>
        <h2 className="quiz-title">No quiz results yet.</h2>
        <p className="feedback-message">
          You haven't completed any quizzes yet. Go ahead and choose and
          complete a quiz first!
        </p>

        <div className="empty-state-actions">
          <Link to="/" className="main-btn">
            Start the Quiz Now
          </Link>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedbackMessage = () => {
    if (percentage === 100) return " ✨Amazing! You got a perfect score!";
    if (percentage >= 75) return " 👏Great job! A very satisfying result!";
    if (percentage >= 50) return " 👍 Lumayan! Masih bisa ditingkatkan lagi!";
    return "💡 Don't give up! Try practicing again..";
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Finished!</h1>

      <div className="result-score-box">
        <h2 className="final-score">
          Your score: <span>{score}</span> / {totalQuestions}
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#f59e0b",
            fontWeight: "bold",
            margin: "6px 0",
          }}
        >
          🔥 Best Streak: {maxStreak}
        </p>

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
                  Your Answer:{" "}
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
                    Correct Answer: <strong>{item.correctAnswer}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="main-btn" onClick={onViewHistory}>
          View History
        </button>

        <button className="secondary-btn" onClick={onReset}>
          Set Up a New Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
