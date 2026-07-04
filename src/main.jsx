import { createRoot } from "react-dom/client";

import { StrictMode } from "react";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import Themeprovider from "./contex/Themeprovider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Themeprovider>
      <AppRoutes />
    </Themeprovider>
  </StrictMode>,
);
