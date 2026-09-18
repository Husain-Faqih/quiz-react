import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/global.css";
import "./style/leaderboard.css";
import "./style/question.css";
import "./style/setting.css";
import "./style/result.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
