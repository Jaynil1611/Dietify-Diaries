import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { VideoContextProvider } from "./contexts";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <VideoContextProvider>
      <Router>
        <App />
      </Router>
    </VideoContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
