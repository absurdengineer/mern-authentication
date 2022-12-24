import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./hooks/useGlobalState";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </Router>
);
