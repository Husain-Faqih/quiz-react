import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/NotFound.css";

const backgroundStyles = [
  "linear-gradient(135deg, #12100E 0%, #2B4162 100%)",
  "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
];

function NotFound() {
  const [currentBg] = useState(() => {
    const randomIndex = Math.floor(Math.random() * backgroundStyles.length);
    return backgroundStyles[randomIndex];
  });

  return (
    <div className="notfound-container" style={{ background: currentBg }}>
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Waduh, Kesasar Bro!</h2>
      <p className="notfound-text">
        Halaman yang kamu cari nggak ada atau udah dipindahin.
      </p>

      <Link to="/" className="notfound-btn">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;
