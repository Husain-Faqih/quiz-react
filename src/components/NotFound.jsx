import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>❌ 404 - Halaman Tidak Ditemukan</h1>
      <Link
        to="/"
        className="btn"
        style={{ margin: "1rem", display: "inline-block" }}
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}

export default NotFound;
