import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider } from "./hooks/useGlobalContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
    <GlobalProvider >
      <App />
    </GlobalProvider>
 
);
