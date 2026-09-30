import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const decodeHTML = (text) => {
  if (!text) return "";
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent;
};

function QuestionCard({
  questions = [],
  selectedAnswer,
  onAnswer,
  score,
  onSaveHistory,
  setSelectedAnswer,
}) {
  const { number } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(15);
  const autoNextTimerRef = useRef(null);

  const currentIndex = parseInt(number, 10) - 1;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isTimeUp = timeLeft === 0;
  const showFeedback = selectedAnswer !== null || isTimeUp;

  const handleNext = () => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }

    setSelectedAnswer(null);
    const nextNumber = parseInt(number, 10) + 1;

    if (nextNumber <= totalQuestions) {
      navigate(`/quiz/${nextNumber}`);
    } else {
      onSaveHistory(totalQuestions, score);
      navigate("/result");
    }
  };

  useEffect(() => {
    setTimeLeft(15);
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
  }, [number]);

  // Hitung Mundur Waktu
  useEffect(() => {
    if (showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [number, showFeedback]);

  // Auto-Next Jeda 5 Detik 
  useEffect(() => {
    if (isTimeUp && !selectedAnswer) {
      autoNextTimerRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, [isTimeUp, selectedAnswer]);

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <h2>Soal tidak ditemukan!</h2>
        <button className="main-btn" onClick={() => navigate("/")}>
          Kembali ke Pengaturan
        </button>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correct_answer;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <span className="badge">{currentQuestion.category}</span>
          <span className="question-count">
            Soal <strong>{currentIndex + 1}</strong> dari {totalQuestions}
          </span>
        </div>
        <div className="timer-badge">
          ⌛ Sisa Waktu: <strong>{timeLeft}</strong> detik
        </div>
        <div className="progres-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <h2 className="question">{decodeHTML(currentQuestion.question)}</h2>

      <div className="answers">
        {currentQuestion.shuffledAnswers.map((answer, index) => {
          let btnClass = "answer-btn";

          if (showFeedback) {
            if (answer === currentQuestion.correct_answer) {
              btnClass += " correct";
            } else if (answer === selectedAnswer) {
              btnClass += " wrong";
            }
          }

          return (
            <button
              key={`${currentIndex}-${index}`}
              onClick={() => onAnswer(answer, currentQuestion)}
              disabled={showFeedback}
              className={btnClass}
            >
              <span className="option-prefix">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{decodeHTML(answer)}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="feedback-container">
          <div
            className={`status-badge ${
              selectedAnswer === null
                ? "status-wrong"
                : isCorrect
                  ? "status-correct"
                  : "status-wrong"
            }`}
          >
            {selectedAnswer !== null
              ? isCorrect
                ? "🟢 Benar!"
                : "🔴 Salah!"
              : "⏰ Waktu Habis!"}
          </div>

          <button className="next-button main-btn" onClick={handleNext}>
            {parseInt(number, 10) === totalQuestions ? "Selesai ➔" : "Next ➔"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
