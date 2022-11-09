import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "@styles/global.css";
import App from "@components/Calculator";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
