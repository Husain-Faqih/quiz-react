import { useState } from "react";
import "../style/CustomSoal.css";

export default function CustomSoal() {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
  });

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

    if (!formData.question.trim()) {
      alert("Pertanyaan tidak boleh kosong!");
      return;
    }

    if (formData.options.some((opt) => !opt.trim())) {
      alert("Semua 4 pilihan jawaban harus diisi!");
      return;
    }

    const correctAnswer = formData.options[formData.correctAnswerIndex];
    const incorrectAnswers = formData.options.filter(
      (_, idx) => idx !== formData.correctAnswerIndex,
    );

    const newQuestionData = {
      question: formData.question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category: "Custom",
    };

    console.log("Soal Berhasil Disimpan:", newQuestionData);
    setSuccessMessage("✨ Soal custom berhasil disimpan!");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="custom-soal-page">
      <div className="quiz-card-container">
        {/* Meta Atas */}
        <div className="card-header-meta">
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
                  onClick={() =>
                    setFormData({ ...formData, correctAnswerIndex: idx })
                  }
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

          <div className="action-footer">
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
