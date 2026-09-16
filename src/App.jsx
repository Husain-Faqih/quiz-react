import { useEffect, useState } from "react";

const decodeHTML = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const fetchQuestions = () => {
    setLoading(true);
    setError("");

    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal terhubung ke server");
        }

        return response.json();
      })
      .then((data) => {
        if (data.response_code !== 0) {
          throw new Error("Gagal memuat soal dari API");
        }

        setQuestions(data.results);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return <h1>⏳ Memuat soal...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>❌ Gagal memuat soal</h1>
        <p>{error}</p>

        <button onClick={fetchQuestions}>Coba Lagi</button>
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    return (
      <div className="quiz-container result-container">
        <h1 className="quiz-title">🎉 Quiz Selesai!</h1>

        <h2 className="final-score">
          Skor kamu: {score} / {questions.length}
        </h2>

        <button className="next-button" onClick={fetchQuestions}>
          Main Lagi
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ];

  answers.sort(() => Math.random() - 0.5);

  const isCorrect = selectedAnswer === currentQuestion.correct_answer;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(questions.length);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Trivia Quiz</h1>

      <p className="question-number">
        Soal {currentIndex + 1} / {questions.length}
      </p>

      <h2 className="question">{decodeHTML(currentQuestion.question)}</h2>

      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
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
        <button className="next-button" onClick={handleNextQuestion}>
          Ngit ext
        </button>
      )}
    </div>
  );
}

export default App;
