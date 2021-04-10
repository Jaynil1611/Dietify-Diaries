import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { VideoContextProvider } from "./contexts";
import { setupMockServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

setupMockServer();

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
