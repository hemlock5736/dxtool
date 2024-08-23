import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Context } from "./contexts/Context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
);
