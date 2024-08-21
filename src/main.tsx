import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToolProvider } from "./context/ToolContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToolProvider>
      <App />
    </ToolProvider>
  </StrictMode>
);
