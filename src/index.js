import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// context for globally used
import { AlertProvider } from "./contexts/AlertFunc";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AlertProvider>
    <App />
  </AlertProvider>,
);
