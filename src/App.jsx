import { useState } from "react";

const decodeHTML = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function App() {
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const fetchQuestions = () => {
    setLoading(true);
    setError("");

    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (category) url += `&category=${category}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Gagal terhubung ke server");
        return response.json();
      })
      .then((data) => {
        if (data.response_code !== 0)
          throw new Error("Gagal memuat soal dari API");
        const formattedQuestions = data.results.map((q) => {
          const allAnswers = [q.correct_answer, ...q.incorrect_answers];
          return {
            ...q,
            shuffledAnswers: shuffleArray(allAnswers),
          };
        });

        setQuestions(formattedQuestions);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setIsStarted(true);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleResetToSettings = () => {
    setIsStarted(false);
    setQuestions([]);
  };

  if (loading) return <h1>⏳ Memuat soal...</h1>;

  if (error) {
    return (
      <div>
        <h1>❌ Gagal memuat soal</h1>
        <p>{error}</p>
        <button className="btn" onClick={fetchQuestions}>
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Pengaturan  Quiz</h1>

        <div className="settings-form">
          <label>Jumlah Soal:</label>
          <select value={amount} onChange={(e) => setAmount(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>

          <label>Tingkat Kesulitan:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Semua Kesulitan</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label>Kategori:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            <option value="21">Sports</option>
            <option value="11">Film</option>
          </select>

          <button className="next-button" onClick={fetchQuestions}>
            Mulai
          </button>
        </div>
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
        <button className="next-button" onClick={handleResetToSettings}>
          Atur Quiz Baru
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correct_answer;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Trivia Quiz</h1>
      <p className="question-number">
        Soal {currentIndex + 1} / {questions.length}
      </p>

      <h2 className="question">{decodeHTML(currentQuestion.question)}</h2>

      <div className="answers">
        {currentQuestion.shuffledAnswers.map((answer, index) => (
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
          Next
        </button>
      )}
    </div>
  );
}

export default App;
