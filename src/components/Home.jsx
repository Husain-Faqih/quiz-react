import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

export default function Home({
  amount,
  setAmount,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  maxStreak,
  history,
  onStartQuiz,
}) {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartQuiz) onStartQuiz();
  };

  return (
    <div className="main-layout">
      <header className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          ⚡ Logo Quiz
        </div>
        <div className="search-container">
          <input type="text" placeholder="Cari kuis, topik, atau kategori..." />
        </div>
        <button className="btn-login">Login/Signup</button>
      </header>

      <main className="content-container">
        <div className="hero-grid">
          <div className="card leaderboard-card">
            <h3>Leaderboard & Score</h3>
            <div className="user-score-badge">
              <span>🔥 Best Streak</span>
              <strong>{maxStreak}</strong>
            </div>

            <div className="mini-leaderboard">
              <h4>Top History</h4>
              {history && history.length > 0 ? (
                history.slice(0, 3).map((item, idx) => (
                  <div key={item.id || idx} className="mini-rank-item">
                    <span>
                      #{idx + 1} {item.category}
                    </span>
                    <strong>{item.score}</strong>
                  </div>
                ))
              ) : (
                <p className="empty-text">Belum ada riwayat</p>
              )}
            </div>
          </div>

          <div className="card setting-card">
            <h2 className="setting-title">Setting</h2>
            <form onSubmit={handleStart} className="setting-form">
              <div className="setting-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-category"
                >
                  <option value="">Semua Kategori</option>
                  <option value="9">General Knowledge</option>
                  <option value="18">Computers & IT</option>
                  <option value="21">Sports</option>
                  <option value="31">Anime & Manga</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Difficulty</label>
                <div className="pill-grid">
                  {["easy", "medium", "hard", "extreme"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`pill-btn ${difficulty === level ? "active" : ""}`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-group">
                <label>Questions</label>
                <div className="pill-grid">
                  {["10", "20", "50"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`pill-btn ${amount === num ? "active" : ""}`}
                      onClick={() => setAmount(num)}
                    >
                      {num}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Custom"
                    className="input-custom-pill"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-start-quiz">
                Mulai Quiz
              </button>
            </form>
          </div>
        </div>

        <section className="section-bar categories-bar">
          <h4>Kategori Populer</h4>
          <div className="category-tags">
            <span onClick={() => setCategory("18")}>💻 IT & Tech</span>
            <span onClick={() => setCategory("9")}>🧠 Pengetahuan Umum</span>
            <span onClick={() => setCategory("31")}>⛩️ Anime</span>
            <span onClick={() => setCategory("21")}>⚽ Olahraga</span>
          </div>
        </section>

        <section className="section-bar info-bar">
          <p>🚀 Tantang dirimu hari ini & pecahkan rekor streak terbanyak!</p>
        </section>
      </main>
    </div>
  );
}
