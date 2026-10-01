import loadingIcon from "../assets/loading.svg"; // Sesuaikan nama SVG lu
import "../style/global.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={loadingIcon} className="spinner-anim" alt="Memuat soal..." />
      <p>Memuat soal kuis...</p>
    </div>
  );
}
