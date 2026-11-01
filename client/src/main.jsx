import React from "react";
import { createRoot } from "react-dom/client";
import Page from "./Page.jsx";
import "./styles.css";
import "./Firebase";
import "./utils/analytics";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
