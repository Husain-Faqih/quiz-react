import { useMemo } from "react";
import { Link } from "react-router-dom";
import "../style/NotFound.css";

const BACKGROUND_STYLES = [
  "linear-gradient(135deg, #12100E 0%, #2B4162 100%)",
  "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
];

function NotFound() {
  const currentBg = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_STYLES.length);
    return BACKGROUND_STYLES[randomIndex];
  }, []);

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
