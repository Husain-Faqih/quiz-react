import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CustomSoal.css";

export default function CustomSoal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Pertanyaan tidak boleh kosong!";
    }

    if (formData.options.some((opt) => !opt.trim())) {
      newErrors.options = "Semua 4 pilihan jawaban harus diisi!";
    }

    if (formData.correctAnswerIndex === null) {
      newErrors.correctAnswerIndex =
        "Klik abjad (A/B/C/D) untuk memilih jawaban yang benar!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const correctAnswer = formData.options[formData.correctAnswerIndex];
    const incorrectAnswers = formData.options.filter(
      (_, idx) => idx !== formData.correctAnswerIndex,
    );

    const newQuestionData = {
      question: formData.question.trim(),
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category: "Custom",
    };

    try {
      const existingQuestions =
        JSON.parse(localStorage.getItem("custom_questions")) || [];
      const updatedQuestions = [...existingQuestions, newQuestionData];
      localStorage.setItem(
        "custom_questions",
        JSON.stringify(updatedQuestions),
      );

      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: null,
      });

      setSuccessMessage("✨ Soal custom berhasil disimpan ke localStorage!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
    }
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="custom-soal-page">
      <div className="quiz-card-container">
        <div className="card-header-meta">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-back"
          >
            ← Kembali
          </button>
          <span className="category-badge">Custom Knowledge</span>
          <span className="soal-counter">
            Soal <strong>1</strong> dari 10
          </span>
        </div>

        <div className="timer-text">⏳ Sisa Waktu: -- detik</div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="question-field"
            placeholder="Tuliskan pertanyaan kuis kamu di sini..."
            rows={2}
            value={formData.question}
            onChange={handleQuestionChange}
          />
          {errors.question && (
            <p
              className="error-text"
              style={{
                color: "#f87171",
                fontSize: "14px",
                marginTop: "-8px",
                marginBottom: "12px",
              }}
            >
              {errors.question}
            </p>
          )}

          <div className="options-list">
            {formData.options.map((opt, idx) => (
              <div
                key={idx}
                className={`option-item ${
                  formData.correctAnswerIndex === idx
                    ? "is-correct-selected"
                    : ""
                }`}
              >
                <div
                  className="option-badge"
                  onClick={() => {
                    setFormData({ ...formData, correctAnswerIndex: idx });
                  }}
                  title="Klik abjad untuk menjadikan ini Jawaban Benar"
                >
                  {labels[idx]}
                </div>
                <input
                  type="text"
                  className="option-input"
                  placeholder={`Ketik Pilihan ${labels[idx]}...`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>

          {errors.options && (
            <p
              className="error-text"
              style={{ color: "#f87171", fontSize: "14px", marginTop: "8px" }}
            >
              {errors.options}
            </p>
          )}
          {errors.correctAnswerIndex && (
            <p
              className="error-text"
              style={{ color: "#f87171", fontSize: "14px", marginTop: "4px" }}
            >
              {errors.correctAnswerIndex}
            </p>
          )}

          <div className="action-footer" style={{ marginTop: "16px" }}>
            {successMessage && (
              <span className="success-text">{successMessage}</span>
            )}
            <button type="submit" className="btn-save-soal">
              Simpan Soal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
