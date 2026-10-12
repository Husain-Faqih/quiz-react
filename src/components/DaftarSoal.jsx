import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/DaftarSoal.css";

function DaftarSoal() {
  const navigate = useNavigate();
  const [customQuestions, setCustomQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Koreksi: options diinisialisasi sebagai array kosong agar map() tidak error
  const [editForm, setEditForm] = useState({
    question: "",
    options: ["", "", ""],
    correctAnswerIndex: 0,
    points: 100,
    time: 15,
  });

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

  const handleDelete = (indexToDelete) => {
    const updateQuestions = customQuestions.filter(
      (_, index) => index !== indexToDelete,
    );
    setCustomQuestions(updateQuestions);
    localStorage.setItem("custom_questions", JSON.stringify(updateQuestions));

    if (editingIndex === indexToDelete) {
      setEditingIndex(null);
    }
  };

  const handleStartEdit = (index) => {
    setEditingIndex(index);
    const target = customQuestions[index];
    setEditForm({
      question: target.question || "",
      options: target.options ? [...target.options] : ["", "", ""],
      correctAnswerIndex: Number(target.correctAnswerIndex) || 0,
      points: target.points || 100,
      time: target.time || 15,
    });
  };

  const handleSaveEdit = (index) => {
    const updateQuestions = [...customQuestions];
    updateQuestions[index] = {
      ...updateQuestions[index],
      question: editForm.question,
      options: editForm.options,
      correctAnswerIndex: editForm.correctAnswerIndex,
      points: editForm.points,
      time: editForm.time,
    };

    setCustomQuestions(updateQuestions);
    localStorage.setItem("custom_questions", JSON.stringify(updateQuestions));
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  if (isLoading) {
    return <div className="quiz-editor-container">Memuat data...</div>;
  }

  return (
    <div className="quiz-editor-container">
      <header className="quiz-header">
        <div className="header-left">
          <Link to="/dashboard" type="button" className="btn-back">
            ⬅
          </Link>
          <input
            type="text"
            className="quiz-title-input"
            value={quizTitle}
            placeholder="Untitled Quiz"
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>
        <div className="header-right">
          <button className="btn-review" onClick={() => alert("Review Quiz")}>
            Review Quiz
          </button>
          <button className="btn-save" onClick={() => alert("Quiz Disimpan!")}>
            Simpan
          </button>
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
            const isEditing = editingIndex === index;
            const allOptions = Array.isArray(q.options) ? q.options : [];

            return (
              <div key={q.id || index} className="question-card">
                <div className="card-actions">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn-simpan"
                        onClick={() => handleSaveEdit(index)}
                        title="Simpan perubahan"
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        className="btn-batal"
                        onClick={handleCancelEdit}
                        title="Batal"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-action btn-edit"
                        onClick={() => handleStartEdit(index)}
                        title="Edit soal ini"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(index)}
                        title="Hapus soal ini"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>

                <div className="card-number">{index + 1}</div>
                {isEditing ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      type="text"
                      value={editForm.question}
                      onChange={(e) =>
                        setEditForm({ ...editForm, question: e.target.value })
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        backgroundColor: "#0b0f19",
                        border: "1px solid #334155",
                        color: "#fff",
                        width: "100%",
                      }}
                    />

                    <div className="answers-grid">
                      {editForm.options.map((optText, optIdx) => (
                        <div
                          key={optIdx}
                          className="answer-option"
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={editForm.correctAnswerIndex === optIdx}
                            onChange={() =>
                              setEditForm({
                                ...editForm,
                                correctAnswerIndex: optIdx,
                              })
                            }
                          />
                          <input
                            type="text"
                            value={optText}
                            onChange={(e) => {
                              const newOpts = [...editForm.options];
                              newOpts[optIdx] = e.target.value;
                              setEditForm({ ...editForm, options: newOpts });
                            }}
                            style={{
                              flex: 1,
                              padding: "6px",
                              borderRadius: "4px",
                              backgroundColor: "#0b0f19",
                              border: "1px solid #334155",
                              color: "#fff",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-text">{q.question}</div>

                    <div className="answers-grid">
                      {allOptions.map((optionText, optIdx) => {
                        const isCorrect =
                          optIdx === Number(q.correctAnswerIndex);

                        return (
                          <div key={optIdx} className="answer-option">
                            <span className="option-text">{optionText}</span>
                            <span
                              className={`radio-dot ${isCorrect ? "correct" : ""}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DaftarSoal;
