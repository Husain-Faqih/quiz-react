const decodeHTML = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

function QuestionCard({
  currentQuestion,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
}) {
  const isCorrect = selectedAnswer === currentQuestion.correct_answer;
  const progressPrecentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <span className="badge">{currentQuestion.category}</span>
          <span className="question-count">
            Soal <strong>{currentIndex + 1}</strong> dari {totalQuestions}
          </span>
        </div>
        <div className="progres-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPrecentage}%` }}
          ></div>
        </div>
      </div>

      <h2 className="question">{decodeHTML(currentQuestion.question)}</h2>

      <div className="answers">
        {currentQuestion.shuffledAnswers.map((answer, index) => {
          let btnClass = "answer-btn";
          if (selectedAnswer !== null) {
            if (answer === currentQuestion.correct_answer)
              btnClass += " correct";
            else if (answer === selectedAnswer) btnClass += " wrong";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswer(answer)}
              disabled={selectedAnswer !== null}
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
      {selectedAnswer && (
        <div className="feedback-container">
          <div
            className={`status-badge ${isCorrect ? "status-correct" : "status-wrong"}`}
          >
            {isCorrect ? "🟢 Benar!" : "🔴 Salah!"}
          </div>
          <button className="next-button main-btn" onClick={onNext}>
            Next ➔
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
