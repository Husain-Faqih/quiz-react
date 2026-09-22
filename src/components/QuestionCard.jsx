import { useParams, useNavigate } from "react-router-dom";

const decodeHTML = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

function QuestionCard({
  questions,
  selectedAnswer,
  onAnswer,
  score,
  onSaveHistory,
  setSelectedAnswer,
}) {
  const { number } = useParams();
  const navigate = useNavigate();

  // Mengubah parameter nomor di URL (misal: "1") menjadi index array (misal: 0)
  const currentIndex = parseInt(number, 10) - 1;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Jika user refresh atau ketik URL manual saat questions belum terisi
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

  const handleNext = () => {
    setSelectedAnswer(null);
    const nextNumber = parseInt(number, 10) + 1;

    if (nextNumber <= totalQuestions) {
      // Pindah ke route nomor soal berikutnya
      navigate(`/quiz/${nextNumber}`);
    } else {
      // Jika sudah soal terakhir, simpan riwayat & ke hasil
      onSaveHistory(score, totalQuestions);
      navigate("/result");
    }
  };

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
            style={{ width: `${progressPercentage}%` }}
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
              onClick={() => onAnswer(answer, currentQuestion)}
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
            className={`status-badge ${
              isCorrect ? "status-correct" : "status-wrong"
            }`}
          >
            {isCorrect ? "🟢 Benar!" : "🔴 Salah!"}
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
