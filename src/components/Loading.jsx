import loadingIcon from "../assets/loading.svg";
import "../style/Loading.css";

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <img
        src={loadingIcon}
        className="spin-animation"
        alt="Loading questions..."
      />
      <p style={{ marginTop: "12px", fontSize: "1rem" }}>
        Loading quiz questions... 
      </p>
    </div>
  );
}
