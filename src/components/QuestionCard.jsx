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

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Trivia Quiz</h1>
      <p className="question-number">
        Soal {currentIndex + 1} / {totalQuestions}
      </p>

      <h2 className="question">{decodeHTML(currentQuestion.question)}</h2>

      <div className="answers">
        {currentQuestion.shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            disabled={selectedAnswer !== null}
            className={
              selectedAnswer !== null
                ? answer === currentQuestion.correct_answer
                  ? "correct"
                  : answer === selectedAnswer
                    ? "wrong"
                    : ""
                : ""
            }
          >
            {decodeHTML(answer)}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <p className={isCorrect ? "result correct-text" : "result wrong-text"}>
          {isCorrect ? "🟢 Jawaban benar!" : "🔴 Jawaban salah!"}
        </p>
      )}

      {selectedAnswer && (
        <button className="next-button" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default QuestionCard;
