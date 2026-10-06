import { useState } from "react";
import "../style/CustomSoal.css";

export default function CustomSoal() {
  const [formData, setFormData] = useState({
    question: "",
    correctAnswer: "",
    incorrectAnswers: ["", "", ""],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleCorrectAnswerChange = (e) => {
    setFormData({ ...formData, correctAnswer: e.target.value });
  };

  const handleIncorrectAnswerChange = (index, value) => {
    const updatedIncorrect = [...formData.incorrectAnswers];
    updatedIncorrect[index] = value;
    setFormData({ ...formData, incorrectAnswers: updatedIncorrect });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Pertanyaan tidak boleh kosong.";
    }

    if (!formData.correctAnswer.trim()) {
      newErrors.correctAnswer = "Jawaban benar wajib diisi.";
    }

    const hasEmptyIncorrect = formData.incorrectAnswers.some(
      (ans) => !ans.trim(),
    );
    if (hasEmptyIncorrect) {
      newErrors.incorrectAnswers = "Semua pilihan jawaban salah harus diisi.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const newQuestionData = {
        question: formData.question,
        correct_answer: formData.correctAnswer,
        incorrect_answers: formData.incorrectAnswers,
        category: "Custom",
      };

      console.log("Data Soal Custom Created:", newQuestionData);
      setSuccessMessage("Soal berhasil dibuat!");

      setFormData({
        question: "",
        correctAnswer: "",
        incorrectAnswers: ["", "", ""],
      });
    }
  };

  return (
    <div className="custom-soal-container">
      <h2 className="custom-soal-title">✨ Buat Soal Custom</h2>

      <form onSubmit={handleSubmit} className="custom-soal-form">
        <div className="form-group">
          <label className="form-label">Pertanyaan:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Masukkan pertanyaan kuis..."
            value={formData.question}
            onChange={handleQuestionChange}
          />
          {errors.question && <p className="error-text">{errors.question}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Jawaban Benar:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Jawaban yang benar..."
            value={formData.correctAnswer}
            onChange={handleCorrectAnswerChange}
          />
          {errors.correctAnswer && (
            <p className="error-text">{errors.correctAnswer}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Pilihan Jawaban Salah (3 Pilihan):
          </label>
          <div className="incorrect-answers-grid">
            {formData.incorrectAnswers.map((ans, idx) => (
              <input
                key={idx}
                type="text"
                className="form-input"
                placeholder={`Jawaban salah ${idx + 1}`}
                value={ans}
                onChange={(e) =>
                  handleIncorrectAnswerChange(idx, e.target.value)
                }
              />
            ))}
          </div>
          {errors.incorrectAnswers && (
            <p className="error-text">{errors.incorrectAnswers}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          💾 Simpan Soal
        </button>
      </form>

      {/* Pesan Sukses */}
      {successMessage && <div className="success-banner">{successMessage}</div>}
    </div>
  );
}
