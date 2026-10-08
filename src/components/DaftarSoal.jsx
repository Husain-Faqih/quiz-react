import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/DaftarSoal.css";
function DaftarSoal() {
  const [customQuestions, setCustomQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("custom_questions");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          setCustomQuestions(parsedData);
        } else {
          setCustomQuestions([]);
        }
      } catch (error) {
        console.error("Gagal mengurai data dari localStorage:", error);
        setCustomQuestions([]);
      }
    } else {
      setCustomQuestions([]);
    }

    setIsLoading(false);
  }, []);

  const totalQuestions = customQuestions.length;
  const totalPoints = customQuestions.reduce(
    (acc, q) => acc + (Number(q.points) || 100),
    0,
  );
  const totalSeconds = customQuestions.reduce(
    (acc, q) => acc + (Number(q.time) || 30),
    0,
  );

  if (isLoading) {
    return <div className="quiz-editor-container">Memuat data...</div>;
  }

  return (
    <div className="quiz-editor-container">
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/dashboard" type="button" className="btn-back">
            ←
          </Link>
          <input
            type="text"
            className="quiz-title-input"
            value={quizTitle}
            placeholder="Untiled Quiz"
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>
        <div className="header-right">
          <button className="btn-review">Review Quiz</button>
          <button className="btn-save">Simpan</button>
        </div>
      </header>

      <div className="quiz-stats-bar">
        <div className="stats-group">
          <span>
            <strong>{totalQuestions}</strong> Pertanyaan
          </span>
          <span>
            <strong>{totalPoints}</strong> Poin
          </span>
          <span>
            <strong>{totalSeconds}</strong> Detik
          </span>
        </div>
        <Link to="/buat-soal">
          <button className="btn-add-question">+ Tambahkan Soal</button>
        </Link>
      </div>

      {customQuestions.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#cbd5e1" }}>
          <h3>Belum ada soal custom</h3>
          <p>
            Silakan klik tombol "+ Tambahkan Soal" di atas untuk membuat soal
            baru.
          </p>
        </div>
      ) : (
        <div className="questions-grid">
          {customQuestions.map((q, index) => {
            const incorrects = Array.isArray(q.incorrectAnswers)
              ? q.incorrectAnswers
              : [];
            const allOptions = [q.correctAnswer, ...incorrects];

            return (
              <div key={q.id || index} className="question-card">
                <div className="card-number">{index + 1}</div>
                <div className="card-text">{q.question}</div>

                <div className="answers-grid">
                  {allOptions.map((optionText, optIdx) => {
                    const isCorrect = optionText === q.correctAnswer;
                    return (
                      <div key={optIdx} className="answer-option">
                        <span
                          className={`radio-dot ${isCorrect ? "correct" : ""}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DaftarSoal;
