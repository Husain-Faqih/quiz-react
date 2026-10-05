import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import "../style/GuestHome.css";

const DEMO_QUESTIONS = [
  {
    question:
      "Logo brand teknologi manakah yang memiliki simbol buah apel tergigit?",
    options: ["Microsoft", "Apple", "Google", "Samsung"],
    correct: "Apple",
  },
  {
    question:
      "Kategori anime populer manakah yang identik dengan gambar Topi Jerami?",
    options: ["Naruto", "One Piece", "Bleach", "Dragon Ball"],
    correct: "One Piece",
  },
];

export default function GuestHome({ onGuestStart }) {
  const [demoIndex, setDemoIndex] = useState(0);
  const [selectedDemoAns, setSelectedDemoAns] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentDemo = DEMO_QUESTIONS[demoIndex];

  const handleDemoSelect = (option) => {
    setSelectedDemoAns(option);
    setShowResult(true);
  };

  const handleNextDemo = () => {
    setSelectedDemoAns(null);
    setShowResult(false);
    setDemoIndex((prev) => (prev + 1) % DEMO_QUESTIONS.length);
  };

  return (
    <div className="guest-container fade-in">
      <header className="guest-nav">
        <img src={Logo} className="app-logo" alt="Logo Quiz" />
        <div className="nav-actions">
          <button className="secondary-btn nav-btn" onClick={onGuestStart}>
            Masuk
          </button>
          <button className="main-btn nav-btn" onClick={onGuestStart}>
            Daftar
          </button>
        </div>
      </header>

      <section className="hero-section">
        <span className="badge hero-badge">Main Quis Trivia & Logo Online</span>
        <h1 className="hero-title">
          Uji Pengetahuanmu & Pecahkan Rekor{" "}
          <span className="highlight-text">Streak!</span>
        </h1>
        <p className="hero-description">
          Tebak ratusan quis dari kategori IT, Anime, Olahraga, Film, dan
          General Knowledge. Main gratis sekarang tanpa ribet.
        </p>
        <div className="hero-cta-group">
          <button className="main-btn cta-primary" onClick={onGuestStart}>
            Main Cepat (Guest)
          </button>
          <button
            className="secondary-btn cta-secondary"
            onClick={onGuestStart}
          >
            Buat Akun Gratis
          </button>
        </div>
      </section>

      <section className="demo-section">
        <div className="card demo-card">
          <div className="demo-header">
            <span className="demo-tag">💡 Coba Demo Singkat</span>
            <span className="demo-step">
              Soal {demoIndex + 1} dari {DEMO_QUESTIONS.length}
            </span>
          </div>

          <h3 className="demo-question">{currentDemo.question}</h3>

          <div className="demo-options">
            {currentDemo.options.map((opt) => {
              let btnClass = "opt-btn demo-opt";
              if (showResult) {
                if (opt === currentDemo.correct) btnClass += " correct";
                else if (opt === selectedDemoAns) btnClass += " wrong";
              }

              return (
                <button
                  key={opt}
                  className={btnClass}
                  disabled={showResult}
                  onClick={() => handleDemoSelect(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="demo-feedback fade-in">
              {selectedDemoAns === currentDemo.correct ? (
                <p className="feedback-text correct-text">
                  🎉 Benar sekali! Keren banget bro.
                </p>
              ) : (
                <p className="feedback-text wrong-text">
                  ❌ Hampir tepat! Jawaban yang benar:{" "}
                  <strong>{currentDemo.correct}</strong>
                </p>
              )}
              <div className="demo-actions">
                <button
                  className="secondary-btn demo-next-btn"
                  onClick={handleNextDemo}
                >
                  Coba Soal Lain 🔄
                </button>
                <button
                  className="main-btn demo-start-btn"
                  onClick={onGuestStart}
                >
                  Mainkan Quis Lengkap 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="features-grid">
        <div className="card feature-card">
          <span className="feature-icon">🔥</span>
          <h4>Streak System</h4>
          <p>
            Kumpulkan poin dan hitung berapa banyak jawaban benar beruntun yang
            bisa kamu capai.
          </p>
        </div>
        <div className="card feature-card">
          <span className="feature-icon">📚</span>
          <h4>Ratusan Soal API</h4>
          <p>
            Soal selalu diperbarui dari database OpenTDB dengan berbagai tingkat
            kesulitan.
          </p>
        </div>
        <div className="card feature-card">
          <span className="feature-icon">📊</span>
          <h4>Riwayat Skormu</h4>
          <p>
            Pantau perkembangan hasil quis dan tingkatkan rekor pribadimu setiap
            harinya.
          </p>
        </div>
      </section>
    </div>
  );
}
