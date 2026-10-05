import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QuestionCard from "./components/QuestionCard";
import History from "./components/History";
import Result from "./components/Result";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function App() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");

  const [questions, setQuestions] = useState(() => {
    const saved = sessionStorage.getItem("quiz_questions");
    return saved ? JSON.parse(saved) : [];
  });

  const [score, setScore] = useState(() => {
    const saved = sessionStorage.getItem("quiz_score");
    return saved ? JSON.parse(saved) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const saved = sessionStorage.getItem("quiz_streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [maxStreak, setMaxStreak] = useState(() => {
    const saved = sessionStorage.getItem("quiz_max_streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [useAnswer, setUseAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("quiz_questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    sessionStorage.setItem("quiz_score", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    sessionStorage.setItem("quiz_streak", JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    sessionStorage.setItem("quiz_max_streak", JSON.stringify(maxStreak));
  }, [maxStreak]);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("riwayat")) || [];
      setHistory(savedHistory);
    } catch {
      setHistory([]);
    }
  }, []);

  const clearQuizSession = () => {
    sessionStorage.removeItem("quiz_questions");
    sessionStorage.removeItem("quiz_score");
    sessionStorage.removeItem("quiz_streak");
    sessionStorage.removeItem("quiz_max_streak");
    setQuestions([]);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setUseAnswer([]);
  };

  const handleUseAnswer = (answerData) => {
    setUseAnswer((prev) => {
      const isAlreadyRecorded = prev.some(
        (item) => item.questionIndex === answerData.questionIndex,
      );
      if (isAlreadyRecorded) return prev;
      return [...prev, answerData];
    });
  };

  const saveHistory = (totalQuestions, finalScore = score) => {
    const existingHistory = JSON.parse(localStorage.getItem("riwayat")) || [];
    const newEntry = {
      id: Date.now(),
      score: `${finalScore}/${totalQuestions}`,
      rawScore: finalScore,
      maxStreak: maxStreak,
      difficulty: difficulty || "Semua",
      category: category || "Semua",
      date: new Date().toLocaleString("id-ID"),
    };
    const updatedHistory = [...existingHistory, newEntry];
    localStorage.setItem("riwayat", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleDeleteHistoryItem = (targetId, fallbackIndex) => {
    let updatedHistory;
    if (targetId) {
      updatedHistory = history.filter((item) => item.id !== targetId);
    } else {
      updatedHistory = history.filter((_, index) => index !== fallbackIndex);
    }
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
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        setMaxStreak((prevMax) => Math.max(prevMax, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const fetchQuestions = () => {
    setLoading(true);
    setError("");

    let url = `https://opentdb.com/api.php?amount=${amount}&encode=url3986`;

    if (difficulty && difficulty !== "extreme") {
      url += `&difficulty=${difficulty}`;
    }
    if (category) {
      url += `&category=${category}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal terhubung ke server OpenTDB.");
        return res.json();
      })
      .then((data) => {
        if (data.response_code !== 0) {
          throw new Error(
            "Soal tidak ditemukan untuk kombinasi ini. Coba kurangi jumlah soal atau ganti kategori.",
          );
        }

        const formatted = data.results.map((q) => {
          const decodedQuestion = decodeURIComponent(q.question);
          const decodedCorrect = decodeURIComponent(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map((ans) =>
            decodeURIComponent(ans),
          );

          return {
            ...q,
            question: decodedQuestion,
            correct_answer: decodedCorrect,
            incorrect_answers: decodedIncorrect,
            shuffledAnswers: shuffleArray([
              decodedCorrect,
              ...decodedIncorrect,
            ]),
          };
        });

        clearQuizSession();
        setQuestions(formatted);
        navigate("/quiz/1");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    clearQuizSession();
    navigate("/");
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>
        <h1>❌ Gagal memuat soal</h1>
        <p style={{ margin: "16px 0", color: "#f87171" }}>{error}</p>
        <button
          className="btn"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setError("")}
        >
          Kembali ke Dashboard
        </button>
      </div>
    );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            amount={amount}
            setAmount={setAmount}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
            maxStreak={maxStreak}
            history={history}
            onStartQuiz={fetchQuestions}
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
            streak={streak}
            maxStreak={maxStreak}
            onSaveHistory={saveHistory}
            onRecordAnswer={handleUseAnswer}
          />
        }
      />

      <Route
        path="/history"
        element={
          <History
            history={history}
            onDeleteItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        }
      />

      <Route
        path="/result"
        element={
          <Result
            score={score}
            maxStreak={maxStreak}
            totalQuestions={questions.length}
            userAnswers={useAnswer}
            onViewHistory={() => navigate("/history")}
            onReset={handleReset}
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
