import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "/src/Components/APP/App";
import "/src/styles/index.css";
import Auth0ProviderWithHistory from "/src/Components/Auth0ProviderWithHistory/Auth0ProviderWithHistory";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>
);
