import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.css";
import "./style/leaderboard.css";
import "./style/question.css";
import "./style/setting.css";
import "./style/result.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </React.StrictMode>,
);
