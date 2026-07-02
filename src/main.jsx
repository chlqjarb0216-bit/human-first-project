import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css"; //아래 import 2줄 밑에 있었던 줄. 위로 옮김.. css 안되서..
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
