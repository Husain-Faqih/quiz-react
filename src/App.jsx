import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Settings from "./components/Settings";
import QuestionCard from "./components/QuestionCard";
import Leaderboard from "./components/Leaderboard";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleAnswer = (answer, currentQuestion) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
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
        setScore(0);
        setSelectedAnswer(null);
        navigate("/quiz/1");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Settings
            amount={amount}
            setAmount={setAmount}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
            onStart={fetchQuestions}
            onViewLeaderboard={() => navigate("/leaderboard")}
          />
        }
      />
      <Route
        path="/quiz/:number"
        element={
          <QuestionCard
            questions={questions}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onAnswer={handleAnswer}
            score={score}
            setScore={setScore}
            onSaveHistory={saveHistory}
          />
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Leaderboard history={history} onClearHistory={handleClearHistory} />
        }
      />
      <Route
        path="/result"
        element={
          <Result
            score={score}
            totalQuestions={questions.length}
            onViewLeaderboard={() => navigate("/leaderboard")}
            onReset={() => navigate("/")}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
