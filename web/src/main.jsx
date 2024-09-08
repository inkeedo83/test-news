import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "/src/Components/APP/App";
import "/src/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
