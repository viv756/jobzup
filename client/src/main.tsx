import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
