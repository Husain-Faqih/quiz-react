import { useState, useEffect } from "react";
import Settings from "./components/Settings";
import QuestionCard from "./components/QuestionCard";
import Leaderboard from "./components/Leaderboard";
import Result from "./components/Result";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");

  // Kontrol tampilan halaman: "settings" | "quiz" | "result" | "leaderboard"
  const [viewState, setViewState] = useState("settings");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("riwayat")) || [];
    setHistory(savedHistory);
  }, []);

  const saveHistory = (finalScore, totalQuestions) => {
    const existingHistory = JSON.parse(localStorage.getItem("riwayat")) || [];
    const newEntry = {
      score: `${finalScore}/${totalQuestions}`,
      rawScore: finalScore,
      difficulty: difficulty || "Semua",
      category: category || "Semua",
      date: new Date().toLocaleString("id-ID"),
    };
    const updatedHistory = [...existingHistory, newEntry];
    localStorage.setItem("riwayat", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("riwayat");
    setHistory([]);
  };

  const fetchQuestions = () => {
    setLoading(true);
    setError("");

    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (category) url += `&category=${category}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal terhubung ke server");
        return res.json();
      })
      .then((data) => {
        if (data.response_code !== 0) throw new Error("Gagal memuat soal");
        const formatted = data.results.map((q) => ({
          ...q,
          shuffledAnswers: shuffleArray([
            q.correct_answer,
            ...q.incorrect_answers,
          ]),
        }));
        setQuestions(formatted);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setViewState("quiz");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentIndex].correct_answer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(newScore);

    if (currentIndex === questions.length - 1) {
      saveHistory(newScore, questions.length);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentIndex(currentIndex + 1);
    } else {
      setViewState("result");
    }
  };

  if (loading) return <h1>⏳ Memuat soal...</h1>;
  if (error)
    return (
      <div>
        <h1>❌ Gagal memuat soal</h1>
        <p>{error}</p>
        <button className="btn" onClick={fetchQuestions}>
          Coba Lagi
        </button>
      </div>
    );

  if (viewState === "settings") {
    return (
      <Settings
        amount={amount}
        setAmount={setAmount}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
        onStart={fetchQuestions}
        onViewLeaderboard={() => setViewState("leaderboard")}
      />
    );
  }

  if (viewState === "leaderboard") {
    return (
      <Leaderboard
        history={history}
        onClearHistory={handleClearHistory}
        onBack={() => setViewState("settings")}
      />
    );
  }

  if (viewState === "result") {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onViewLeaderboard={() => setViewState("leaderboard")}
        onReset={() => setViewState("settings")}
      />
    );
  }

  return (
    <QuestionCard
      currentQuestion={questions[currentIndex]}
      currentIndex={currentIndex}
      totalQuestions={questions.length}
      selectedAnswer={selectedAnswer}
      onAnswer={handleAnswer}
      onNext={handleNextQuestion}
    />
  );
}

export default App;
